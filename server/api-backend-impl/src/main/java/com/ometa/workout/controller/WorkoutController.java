package com.ometa.workout.controller;

import com.ometa.workout.api.PlaylistApi;
import com.ometa.workout.api.models.ActivityType;
import com.ometa.workout.api.models.Playlist;
import com.ometa.workout.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("workout-api")
public class WorkoutController implements PlaylistApi {

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    WorkoutService workoutService;

    @Override
    public ResponseEntity<Playlist> _createPlaylist(Integer length, ActivityType activitytype) {
        Optional<Playlist> playlist = workoutService.createPlaylist(length, activitytype);
        return playlist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());

    }
}

