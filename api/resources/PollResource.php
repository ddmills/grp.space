<?php
class PollResource extends Rest_Resource {

  public function resource_get($request) {
    $channel_id = $request->inputs->uri('channel_id');
    $con = new mywrap_con();
    $poll =  DJ::get_poll($con, $channel_id);
    $con->close();
    return $poll;
  }

  public function resource_post($request) {
    $channel_id = $request->inputs->requires('channel_id');
    $track_id   = $request->inputs->requires('track_id');
    $next_id    = $request->inputs->requires('next_id');
    $status     = $request->inputs->requires('status');
    $time       = $request->inputs->requires('time');
    $offset     = $request->inputs->requires('offset');

    $con = new mywrap_con();
    $poll = DJ::set_poll($con, $channel_id, $track_id, $next_id, $status, $time, $offset);
    $con->close();
    return $poll;
  }

} ?>