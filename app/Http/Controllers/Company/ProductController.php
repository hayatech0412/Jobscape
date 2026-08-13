<?php

namespace App\Http\Controllers\Company;

use App\Enums\PeriodUnit;
use App\Enums\ProductStatus;
use App\Enums\TargetType;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Attachment;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttachment;
use App\Models\ProductCategory;
use App\Models\ProductDeploy;
use App\Models\ProductFaq;
use App\Models\ProductSchedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class ProductController extends Controller
{

    public function search($status = null, $keyword = null)
    {
        $user = User::find(auth('company')->user()->id);

        if (!$user->has('company')) {
            return [];
        }

        $products = Product::where('company_id', $user->company->id);

        if (!is_null($status) && $status != 0) {
            if ($status == ProductStatus::DRAFT) {
                $products->isDraft();
            } else {
                $products->isPublished()->where('status', $status);
            }
        }

        if (!is_null($keyword) && $keyword != "") {
            $products->whereLike('name', '%' . $keyword . '%')
                ->orWhereLike('overview', '%' . $keyword . '%');
        }

        return $products->orderByDesc('updated_at')->paginate(6);
    }

    public function index(Request $request)
    {
        $status = $request->get('status');
        $keyword = $request->get('keyword');
        $products = $this->search($status, $keyword);

        // dd(\Auth::user());

        return Inertia::render('Company/Products/Index', [
            'headers' => [
                [
                    'text' => 'メーイン画像',
                    'value' => 'main_image',
                ],
                [
                    'text' => '商材名',
                    'value' => 'name',
                ],
                [
                    'text' => '概要文',
                    'value' => 'overview',
                ],
                [
                    'text' => '紹介手数料',
                    'value' => 'rewards',
                ],
                [
                    'text' => '募集期間',
                    'value' => 'recurit_period',
                ],
                [
                    'text' => 'ステータス',
                    'value' => 'status_label',
                ],
                [
                    'text' => '処理操作',
                    'value' => 'actions',
                ],
            ],
            'products' => $products,
            'status_current' => $status ?? 0,
            'keyword' => $keyword ?? "",
            'status_list' => ProductStatus::getArray()
        ]);
    }

    public function searchKeyword(Request $request)
    {
        $status = $request->get('status');
        $keyword = $request->get('keyword');

        $products = $this->search($status, $keyword);

        return response()->json([
            'products' => $products,
            'status_current' => $status ?? 0,
            'keyword' => $keyword ?? "",
        ]);
    }

    public function create()
    {
        $user = User::find(auth('company')->user()->id);
        $main_category = null;
        if ($user->has('company')) {
            $main_category = $user->company->category_id;
        }

        $product_code = "";
        do {
            $product_code = strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 4)) . '-' . substr(str_shuffle('0123456789'), 0, 6);
            $products = Product::where('product_code', $product_code)->get();
        } while (count($products) > 0);
        $area_categories = config('values.prefectures');
        $categories = Category::all();
        $period_units = array_map(function ($unit) {
            return $unit['label'];
        }, PeriodUnit::getArray());

        return Inertia::render('Company/Products/Create', [
            'main_category'     => $main_category,
            'product_code'      => $product_code,
            'publish_at'        => Carbon::now()->format("Y/m/d h:m"),
            'area_categories'   => $area_categories,
            'categories'        => $categories,
            'period_units'      => $period_units,
        ]);
    }

    public function store(ProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = auth('company')->user();
            $company = $user->company;

            $product = $request->all();
            $product['company_id'] = $company->id;

            $categories = $product['categories'];
            $custom_category = $product['custom_category'];
            $image = $product['image'];
            if (isset($product['image_file'])) {
                $image_file = $product['image_file'];
            } else {
                $image_file = null;
            }
            $images = $product['attachments'];
            $introduction1 = $product['introduction1'];
            $introduction2 = $product['introduction2'];
            $response_prefs = $product['response_prefs'];
            $overseas = $product['overseas'];
            $deploies = $product['deploies'];
            $schedules = $product['schedules'];
            if (isset($product['faqs'])) {
                $faqs = $product['faqs'];
            } else {
                $faqs = [];
            }
            $product['reward_amount'] = $product['reward_type'] == '1' ? $product['reward_amount_money'] : $product['reward_amount_percent'];

            unset($product['categories']);
            unset($product['custom_category']);
            unset($product['image']);
            unset($product['image_file']);
            unset($product['images']);
            unset($product['introduction1']);
            unset($product['introduction2']);
            unset($product['response_prefs']);
            unset($product['overseas']);
            unset($product['deploies']);
            unset($product['schedules']);
            unset($product['faqs']);
            unset($product['reward_amount_money']);
            unset($product['reward_amount_percent']);

            $product['is_draft'] = 0;
            $product['status'] = ProductStatus::REVIEW;
            $product = Product::create($product);

            if (!is_null($image) && !is_null($image_file)) {
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/thumbs/", $image_file);
                $product->image_path = "/storage/" . $path;
                $product->image = $image;
                $product->save();
            }

            if (count($images)) {
                $product->attachments()->detach();

                foreach ($images as $imageObj) {
                    $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/attachments/", $imageObj['image_file']);
                    $attachment = Attachment::create([
                        'file_name' => $imageObj['image'],
                        'url' => "/storage/" . $path,
                        'size' => $imageObj['image_file']->getSize()
                    ]);
                    $product->attachments()->attach($attachment->id);
                }
            }

            if ($introduction1 && isset($introduction1['image_file'])) {
                $file = $introduction1['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction1/", $file);
                $introduction1_data = [
                    'image' => $introduction1['image'],
                    'image_path' => "/storage/" . $path,
                    'detail_overview' => $introduction1['detail_overview']
                ];
                $product->update(['introduction1' => $introduction1_data]);
            }

            if ($introduction2 && isset($introduction2['image_file'])) {
                $file = $introduction2['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction2/", $file);
                $introduction2_data = [
                    'image' => $introduction2['image'],
                    'image_path' => "/storage/" . $path,
                    'detail_overview' => $introduction2['detail_overview']
                ];
                $product->update(['introduction2' => $introduction2_data]);
            }

            if ($response_prefs && !empty($response_prefs)) {
                $product->update(['response_prefs' => $response_prefs]);
            }
            if (!is_null($overseas)) {
                $oversea_list = explode(',', $overseas);
                $product->update(['overseas' => $oversea_list]);
            }

            if (count($deploies) > 0) {
                ProductDeploy::where('product_id', $product->id)->delete();

                foreach ($deploies as $deploy) {
                    ProductDeploy::create([
                        'product_id' => $product->id,
                        'deploy_name' => $deploy,
                    ]);
                }
            }

            if ($custom_category) {
                $newCategory = Category::create([
                    'name' => $custom_category,
                ]);
                $categories = array_merge($categories, [$newCategory->id]);
            }
            $product->categories()->sync($categories);

            if (count($schedules) > 0) {
                ProductSchedule::where('product_id', $product->id)->delete();

                foreach ($schedules as $index => $schedule) {
                    $schedule['product_id'] = $product->id;
                    $schedule['order'] = $index + 1;
                    ProductSchedule::create($schedule);
                }
            }

            if (count($faqs) > 0) {
                ProductFaq::where('product_id', $product->id)->delete();

                foreach ($faqs as $faq) {
                    $faq['product_id'] = $product->id;
                    ProductFaq::create($faq);
                }
            }

            $product['company_id'] = $company->id;
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => '操作が失敗しました。']);
        }

        return redirect()->route('company.products.index')->with(['success' => '操作が成功しました。']);
    }

    public function storeDraft(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = auth('company')->user();
            $company = $user->company;

            $product = $request->all();
            $product['company_id'] = $company->id;

            $categories = $product['categories'];
            $custom_category = $product['custom_category'];
            $image = $product['image'];
            if (isset($product['image_file'])) {
                $image_file = $product['image_file'];
            } else {
                $image_file = null;
            }
            $images = $product['images'] ?? [];
            $introduction1 = $product['introduction1'];
            $introduction2 = $product['introduction2'];
            $response_prefs = $product['response_prefs'];
            $overseas = $product['overseas'];
            $deploies = $product['deploies'];
            $schedules = $product['schedules'];
            if (isset($product['faqs'])) {
                $faqs = $product['faqs'];
            } else {
                $faqs = [];
            }
            $product['reward_amount'] = $product['reward_type'] == '1' ? ($product['reward_amount_money'] ?? 0) : ($product['reward_amount_percent'] ?? 0);

            unset($product['categories']);
            unset($product['custom_category']);
            unset($product['image']);
            unset($product['image_file']);
            unset($product['images']);
            unset($product['introduction1']);
            unset($product['introduction2']);
            unset($product['response_prefs']);
            unset($product['overseas']);
            unset($product['deploies']);
            unset($product['schedules']);
            unset($product['faqs']);
            unset($product['reward_amount_money']);
            unset($product['reward_amount_percent']);

            $product['is_draft'] = 1;
            $product['status'] = ProductStatus::DRAFT;
            $product = Product::create($product);

            if (!is_null($image) && !is_null($image_file)) {
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/thumbs/", $image_file);
                $product->image_path = "/storage/" . $path;
                $product->image = $image;
                $product->save();
            }

            if (count($images)) {
                ProductAttachment::where('product_id', $product->id)->delete();

                foreach ($images as $index => $imageObj) {
                    Log::info('index: ' . $index);
                    $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/attachments/", $imageObj['image_file']);
                    $attachment = Attachment::create([
                        'file_name' => $imageObj['image'],
                        'url' => "/storage/" . $path,
                        'size' => $imageObj['image_file']->getSize()
                    ]);
                    ProductAttachment::create([
                        'product_id' => $product->id,
                        'attachment_id' => $attachment->id
                    ]);
                }
            }

            if ($introduction1 && isset($introduction1['image_file'])) {
                $file = $introduction1['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction1/", $file);
                $introduction1_data = [
                    'image' => $introduction1['image'],
                    'image_path' => "/storage/" . $path,
                    'detail_overview' => $introduction1['detail_overview']
                ];
                $product->update(['introduction1' => $introduction1_data]);
            }

            if ($introduction2 && isset($introduction2['image_file'])) {
                $file = $introduction2['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction2/", $file);
                $introduction2_data = [
                    'image' => $introduction2['image'],
                    'image_path' => "/storage/" . $path,
                    'detail_overview' => $introduction2['detail_overview']
                ];
                $product->update(['introduction2' => $introduction2_data]);
            }

            if ($response_prefs && !empty($response_prefs)) {
                $product->update(['response_prefs' => $response_prefs]);
            }
            if (!is_null($overseas)) {

                $oversea_list = explode(',', $overseas);
                $product->update(['overseas' => $oversea_list]);
            }

            if (count($deploies) > 0) {
                ProductDeploy::where('product_id', $product->id)->delete();

                foreach ($deploies as $deploy) {
                    ProductDeploy::create([
                        'product_id' => $product->id,
                        'deploy_name' => $deploy,
                    ]);
                }
            }

            if ($custom_category) {
                $newCategory = Category::create([
                    'name' => $custom_category,
                ]);
                $categories = array_merge($categories, [$newCategory->id]);
            }
            $product->categories()->sync($categories);

            if (count($schedules) > 0) {
                ProductSchedule::where('product_id', $product->id)->delete();

                foreach ($schedules as $index => $schedule) {
                    $schedule['product_id'] = $product->id;
                    $schedule['order'] = $index + 1;
                    ProductSchedule::create($schedule);
                }
            }

            if (count($faqs) > 0) {
                ProductFaq::where('product_id', $product->id)->delete();

                foreach ($faqs as $faq) {
                    $faq['product_id'] = $product->id;
                    ProductFaq::create($faq);
                }
            }

            $product['company_id'] = $company->id;
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->route('company.products.index');
    }

    public function delete(Request $request)
    {
        if (!isset($request['product'])) {
            return back()->with(['error' => 'この商材の削除ができませんでした。']);
        }

        $product = Product::find($request->get('product'));
        if (!$product) return back()->with(['error' => '商材が存在しません。']);

        $product->delete();

        return back()->with(['success' => '商材を成功的に削除しました。']);
    }

    public function edit(Request $request, Product $product)
    {
        $area_categories = config('values.prefectures');
        $categories = Category::all();
        $period_units = array_map(function ($unit) {
            return $unit['label'];
        }, PeriodUnit::getArray());

        return Inertia::render('Company/Products/Edit', [
            'originProduct'     => $product->load('categories', 'deploies', 'schedules', 'attachments', 'faqs'),
            'area_categories'   => $area_categories,
            'categories'        => $categories,
            'period_units'      => $period_units,
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product)
    {
        $data = $request->all();
        try {
            $categories = $request->get('categories');
            if ($categories) {
                $categories = array_map(function ($category) {
                    return $category['id'];
                }, $categories);
            }

            $is_custom_category = $request->get('is_custom_category');
            if ($is_custom_category) {
                $custom_category = $request->get('custom_category');
                $category = Category::firstOrCreate([
                    'name' => $custom_category
                ]);
                $categories[] = $category->id;
            }
            $product->categories()->sync($categories);
            unset($data['categories']);
            unset($data['is_custom_category']);
            unset($data['custom_category']);

            $image_file = $request->file('image_file');
            if (!is_null($image_file)) {
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/thumbs/", $image_file);
                $data['image_path'] = "/storage/" . $path;
                $data['image'] = $request->get('image');
                unset($data['image_file']);
            }

            $images = $request->attachments;
            if (!is_null($images)) {
                $attachmentList = [];
                $remainAttachmentList = [];
                foreach ($images as $index => $image) {
                    if (isset($image['id'])) {
                        $remainAttachmentList[] = $image['id'];
                    } 
                }
                $deletedAttachments = $product->attachments()->whereNotIn('attachments.id', $remainAttachmentList)->get();
                foreach($deletedAttachments as $item) {
                    if ($item->id) {
                        Storage::disk('public')->delete($item->url);
                    }
                    $product->attachments()->detach($item->id);
                }

                foreach ($images as $index => $image) {
                    if (isset($image['image_file'])) {
                        $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/attachments/", $image['image_file']);
                        $attachment = Attachment::create([
                            'file_name' => $image['image'],
                            'url' => "/storage/" . $path,
                            'size' => $image['image_file']->getSize()
                        ]);
                        $product->attachments()->attach($attachment->id);
                    }
                }
            }
            unset($data['attachments']);
            unset($data['images']);

            $introduction1 = $request->get('introduction1');
            if (isset($introduction1['image_file'])) {
                $file = $introduction1['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction1/", $file);
                $introduction1['image_path'] = "/storage/" . $path;
                unset($introduction1['image_file']);
                $data['introduction1'] = $introduction1;
            }

            $introduction2 = $request->get('introduction2');
            if (!is_null($introduction2) && isset($introduction2['image_file'])) {
                $file = $introduction2['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction2/", $file);
                $introduction2['image_path'] = "/storage/" . $path;
                unset($introduction2['image_file']);
                $data['introduction2'] = $introduction2;
            }

            $deploies = $request->get('deploies');
            ProductDeploy::where('product_id', $product->id)->delete();
            foreach ($deploies as $deploy) {
                ProductDeploy::create([
                    'product_id' => $product->id,
                    'deploy_name' => $deploy
                ]);
            }
            unset($data['deploies']);

            $schedules = $request->get('schedules');
            ProductSchedule::where('product_id', $product->id)->delete();
            if (!is_array($schedules)) $schedules = [];
            foreach ($schedules as $index => $schedule) {
                ProductSchedule::create([
                    'product_id' => $product->id,
                    'order' => $index + 1,
                    'title' => $schedule['title'],
                    'start_amount' => $schedule['start_amount'],
                    'start_unit' => $schedule['start_unit'],
                    'end_amount' => $schedule['end_amount'],
                    'end_unit' => $schedule['end_unit'],
                ]);
            }
            unset($data['schedules']);

            $faqs = $request->get('faqs');
            if (!is_array($faqs)) $faqs = [];
            ProductFaq::where('product_id', $product->id)->delete();
            foreach ($faqs as $faq) {
                ProductFaq::create([
                    'product_id' => $product->id,
                    'question' => $faq['question'],
                    'answer' => $faq['answer'],
                ]);
            }
            unset($data['faqs']);

            if (!is_null($request->get('overseas'))) {
                $overseas = explode(",", $request->get('overseas'));
                $data['overseas'] = $overseas;
            }

            $data['reward_amount'] = $data['reward_type'] == 1 ? $request->get('reward_amount_money') : $request->get('reward_amount_percent');
            unset($data['reward_amount_money']);
            unset($data['reward_amount_percent']);

            unset($data['id']);
            $data['publish_at'] = Carbon::now()->format('Y-m-d H:i:s');
            $data['status'] = ProductStatus::REVIEW;

            $product = Product::find($product->id);
            $product->update($data);
            $product->update([
                'status' => ProductStatus::PUBLIC
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            Db::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => '保存に失敗しました。']);
        }

        return back()->with(['success' => "保存しました。"]);
    }

    public function updateDraft(Request $request, Product $product)
    {
        $data = $request->all();
        try {
            $categories = $request->get('categories');
            if ($categories) {
                $categories = array_map(function ($category) {
                    return $category['id'];
                }, $categories);
            }

            $is_custom_category = $request->get('is_custom_category');
            if ($is_custom_category) {
                $custom_category = $request->get('custom_category');
                $category = Category::firstOrCreate([
                    'name' => $custom_category
                ]);
                $categories[] = $category->id;
            }
            $product->categories()->sync($categories);
            unset($data['categories']);
            unset($data['is_custom_category']);
            unset($data['custom_category']);

            $image_file = $request->file('image_file');
            if (!is_null($image_file)) {
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/thumbs/", $image_file);
                $data['image_path'] = "/storage/" . $path;
                $data['image'] = $request->get('image');
                unset($data['image_file']);
            }

            $images = $request->attachments;
            if (!is_null($images)) {
                $attachmentList = [];
                $remainAttachmentList = [];
                foreach ($images as $index => $image) {
                    if (isset($image['id'])) {
                        $remainAttachmentList[] = $image['id'];
                    } 
                }
                $deletedAttachments = $product->attachments()->whereNotIn('attachments.id', $remainAttachmentList)->get();
                foreach($deletedAttachments as $item) {
                    if ($item->id) {
                        Storage::disk('public')->delete($item->url);
                    }
                    $product->attachments()->detach($item->id);
                }

                foreach ($images as $index => $image) {
                    if (isset($image['image_file'])) {
                        $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/attachments/", $image['image_file']);
                        $attachment = Attachment::create([
                            'file_name' => $image['image'],
                            'url' => "/storage/" . $path,
                            'size' => $image['image_file']->getSize()
                        ]);
                        $product->attachments()->attach($attachment->id);
                    }
                }
            }
            unset($data['attachments']);
            unset($data['images']);

            $introduction1 = $request->get('introduction1');
            if (isset($introduction1['image_file'])) {
                $file = $introduction1['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction1/", $file);
                $introduction1['image_path'] = "/storage/" . $path;
                unset($introduction1['image_file']);
                $data['introduction1'] = $introduction1;
            }

            $introduction2 = $request->get('introduction2');
            if (!is_null($introduction2) && isset($introduction2['image_file'])) {
                $file = $introduction2['image_file'];
                $path = Storage::disk('public')->put("/uploads/products/" . $product->id . "/introduction2/", $file);
                $introduction2['image_path'] = "/storage/" . $path;
                unset($introduction2['image_file']);
                $data['introduction2'] = $introduction2;
            }

            $deploies = $request->get('deploies');
            ProductDeploy::where('product_id', $product->id)->delete();
            foreach ($deploies as $deploy) {
                ProductDeploy::create([
                    'product_id' => $product->id,
                    'deploy_name' => $deploy
                ]);
            }
            unset($data['deploies']);

            $schedules = $request->get('schedules');
            ProductSchedule::where('product_id', $product->id)->delete();
            if (!is_array($schedules)) $schedules = [];
            foreach ($schedules as $index => $schedule) {
                ProductSchedule::create([
                    'product_id' => $product->id,
                    'order' => $index + 1,
                    'title' => $schedule['title'],
                    'start_amount' => $schedule['start_amount'],
                    'start_unit' => $schedule['start_unit'],
                    'end_amount' => $schedule['end_amount'],
                    'end_unit' => $schedule['end_unit'],
                ]);
            }
            unset($data['schedules']);

            $faqs = $request->get('faqs');
            if (!is_array($faqs)) $faqs = [];
            ProductFaq::where('product_id', $product->id)->delete();
            foreach ($faqs as $faq) {
                ProductFaq::create([
                    'product_id' => $product->id,
                    'question' => $faq['question'],
                    'answer' => $faq['answer'],
                ]);
            }
            unset($data['faqs']);

            if (!is_null($request->get('overseas'))) {
                $overseas = explode(",", $request->get('overseas'));
                $data['overseas'] = $overseas;
            }

            $data['reward_amount'] = $data['reward_type'] == 1 ? $request->get('reward_amount_money') : $request->get('reward_amount_percent');
            unset($data['reward_amount_money']);
            unset($data['reward_amount_percent']);

            unset($data['id']);
            $data['publish_at'] = Carbon::now()->format('Y-m-d H:i:s');
            $data['status'] = ProductStatus::REVIEW;

            $product = Product::find($product->id);
            $product->update($data);
            $product->update([
                'status' => ProductStatus::DRAFT
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            Db::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => '保存に失敗しました。']);
        }

        return back()->with(['success' => "保存しました。"]);
    }

    public function show(Request $request, Product $product)
    {
        $product->load([
            'deploies',
            'faqs',
            'company.products' => function ($query) use ($product) {
                return $query->whereNotIn('id', [$product->id]);
            },
            'schedules' => function ($query) {
                return $query->orderBy('order', 'asc');
            }
        ]);
        $otherProducts = $product->company->products()
            ->with(['company', 'categories'])
            ->whereNotIn('id', [$product->id])
            ->get();

        return Inertia::render('Company/Products/Show', [
            'target_types' => TargetType::getArray(),
            'period_units' => PeriodUnit::getArray(),
            'product' => $product,
            'otherProducts' => $otherProducts,
        ]);
    }

    public function publish(Request $request, Product $product)
    {
        $product->is_draft = 0;
        $product->status = ProductStatus::REVIEW;
        $product->save();

        return back()->with(['success' => "公開しました。"]);
    }
}
