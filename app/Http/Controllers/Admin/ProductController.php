<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\TargetType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Enums\PeriodUnit;
use App\Enums\ProductStatus;
use App\Models\User;
use App\Models\Category;
use App\Models\Company;
use App\Models\Attachment;
use App\Models\Product;
use App\Models\ProductDeploy;
use App\Models\ProductSchedule;
use App\Models\ProductFaq;
use App\Models\Transaction;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use DB;

class ProductController extends Controller
{
    protected $perPage = 10;
    protected $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $status = $request->status;
        $company = $request->company;


        $query = Product::whereHas('company', function($query) {
                            return $query->whereNot('coporate_code', NULL);
                        })
                        ->with('company')
                        ->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);

        if ($status && $status != 9) {
            $query->where('status', $status);
        }

        if ($company && $company != 0) {
            $query->whereHas('company', function($query) use ($company) {
                return $query->where('id', $company);
            });
        }

        if ($keyword) { 
            $query->where(function($query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%")
                        ->orWhere('overview', 'like', "%$keyword%")
                        ->orWhere('introduction1', 'like', "%$keyword%")
                        ->orWhere('introduction2', 'like', "%$keyword%")
                        ->orWhere('response_prefs', 'like', "%$keyword%")
                        ->orWhere('condition', 'like', "%$keyword%")
                        ->orWhere('introduction_condition', 'like', "%$keyword%")
                        ->orWhere('introduction_memo', 'like', "%$keyword%");
            });
        }

        $query->orderBy("updated_at", "desc");
        $products = $query->paginate($this->perPage)->withQueryString();

        $companies = Company::whereNot('coporate_code', NULL)
                            ->orderByDesc('coporate_name')
                            ->whereHas('products', function($query) {
                                $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                            })
                            ->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'companies' => $companies,
        ]);
    }

    public function requested(Request $request)
    {
        $keyword = $request->keyword;
        $status = $request->status;
        $company = $request->company;


        $query = Product::whereHas('company', function($query) {
                            return $query->whereNot('coporate_code', NULL);
                        })
                        ->with('company')
                        ->where('status', ProductStatus::REVIEW);

        if ($company && $company != 0) {
            $query->whereHas('company', function($query) use ($company) {
                return $query->where('id', $company);
            });
        }

        if ($keyword) { 
            $query->where(function($query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%")
                        ->orWhere('overview', 'like', "%$keyword%")
                        ->orWhere('introduction1', 'like', "%$keyword%")
                        ->orWhere('introduction2', 'like', "%$keyword%")
                        ->orWhere('response_prefs', 'like', "%$keyword%")
                        ->orWhere('condition', 'like', "%$keyword%")
                        ->orWhere('introduction_condition', 'like', "%$keyword%")
                        ->orWhere('introduction_memo', 'like', "%$keyword%");
            });
        }

        $query->orderBy("created_at", "desc");
        $products = $query->paginate($this->perPage)->withQueryString();

        $companies = Company::whereNot('coporate_code', NULL)
                            ->orderByDesc('coporate_name')
                            ->whereHas('products', function($query) {
                                $query->where('status', ProductStatus::REVIEW);
                            })
                            ->get();

        return Inertia::render('Admin/Products/Review', [
            'products' => $products,
            'companies' => $companies,
        ]);
    }

    public function blocked(Request $request)
    {
        $keyword = $request->keyword;
        $company = $request->company;

        $query = Product::whereHas('company', function($query) {
                            return $query->whereNot('coporate_code', NULL);
                        })
                        ->with('company')
                        ->where('status', ProductStatus::BLOCKED);

        if ($company && $company != 0) {
            $query->whereHas('company', function($query) use ($company) {
                return $query->where('id', $company);
            });
        }

        if ($keyword) { 
            $query->where(function($query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%")
                        ->orWhere('overview', 'like', "%$keyword%")
                        ->orWhere('introduction1', 'like', "%$keyword%")
                        ->orWhere('introduction2', 'like', "%$keyword%")
                        ->orWhere('response_prefs', 'like', "%$keyword%")
                        ->orWhere('condition', 'like', "%$keyword%")
                        ->orWhere('introduction_condition', 'like', "%$keyword%")
                        ->orWhere('introduction_memo', 'like', "%$keyword%");
            });
        }

        $query->orderBy("updated_at", "desc");
        $products = $query->paginate($this->perPage)->withQueryString();

        $companies = Company::whereNot('coporate_code', NULL)
                            ->orderByDesc('coporate_name')
                            ->whereHas('products', function($query) {
                                $query->where('status', ProductStatus::BLOCKED);
                            })
                            ->get();

        return Inertia::render('Admin/Products/Block', [
            'products' => $products,
            'companies' => $companies,
        ]);
    }

    public function show(Request $request, Product $product) {
        $product->load([
            'company' => function($query) {
                return $query->with('user');
            },
            'deploies',
            'faqs',
            'company.products' => function($query) use($product) {
                return $query->whereNotIn('id', [$product->id]);
            },
            'schedules' => function($query) {
                return $query->orderBy('order', 'asc');
            }
        ]);
        return Inertia::render('Admin/Products/Show', [
            'target_types' => TargetType::getArray(),
            'product' => $product,
        ]);
    }

    public function delete(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を削除しました。'));
    }

    public function block(Product $product)
    {
        DB::beginTransaction();
        try {
            if ($product->status == ProductStatus::BLOCKED) {
                $product->update(['status' => ProductStatus::PUBLIC]);
            } else {
                $product->update(['status' => ProductStatus::BLOCKED]);
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('操作が成功しました。'));
    }

    public function accept(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->update(['status' => ProductStatus::PUBLIC]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を許可しました。'));
    }

    public function reject(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->update(['status' => ProductStatus::DRAFT]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を不許しました。'));
    }

    
    public function edit(Request $request, Product $product)
    {
        $area_categories = config('values.prefectures');
        $categories = Category::all();
        $period_units = array_map(function ($unit) {
            return $unit['label'];
        }, PeriodUnit::getArray());

        return Inertia::render('Admin/Products/Edit', [
            'originProduct'     => $product->load('categories', 'deploies', 'schedules', 'attachments', 'faqs'),
            'area_categories'   => $area_categories,
            'categories'        => $categories,
            'period_units'      => $period_units,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->all();
        try {
            $categories = $request->get('categories') ?? [];
            $categories = array_map(function ($category) {
                return $category['id'];
            }, $categories);

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

            $images = $request->images;
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

            Product::find($product->id)->update($data);
            DB::commit();
        } catch (\Throwable $e) {
            Db::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => $e->getMessage()]);
        }

        return back()->with(['success' => "保存しました。"]);
    }
}
