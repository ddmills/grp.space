<?php
class TrackResource extends Rest_Resource {

  public function resource_get($request) {
    $track_id = $request->inputs->uri('track_id');
    $con = new mywrap_con();
    $track =  DJ::get_track($con, $track_id);
    $con->close();
    return $track;
  }

} ?>