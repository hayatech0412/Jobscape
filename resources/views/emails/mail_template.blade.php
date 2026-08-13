@section('subject')
  {{ $subject }}
@endsection
@section('html')
  <div style="white-space: pre-wrap;">{!! $content !!}</div>
@endsection

@section('text')
  {!! $content !!}
@endsection
