<?php
class TrackCollectionResource extends Rest_Resource {

  public function resource_get($request) {
    $channel_id = $request->inputs->uri('channel_id');
    $con = new mywrap_con();
    $tracks =  DJ::get_tracks($con, $channel_id);
    $con->close();
    return $tracks;
  }

  public function resource_post($request) {
    $channel_id   = $request->inputs->requires('channel_id');
    $track_name   = $request->inputs->requires('track_name');
    $track_url    = $request->inputs->requires('track_url');
    $track_num    = $request->inputs->requires('track_number');

    $con = new mywrap_con();
    $track = DJ::add_track($con, $channel_id, $track_name, $track_url, $track_num);
    $con->close();
    return $track;
  }

} ?>