package com.ometa.workout.apidelegate;

import com.ometa.workout.api.PlaylistApiDelegate;
import com.ometa.workout.api.models.ActivityType;
import com.ometa.workout.api.models.Playlist;
import com.ometa.workout.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlaylistApiImpl implements PlaylistApiDelegate {

    public PlaylistApiImpl(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    WorkoutService workoutService;

    @Override
    public ResponseEntity<Playlist> createPlaylist(Integer length, ActivityType activitytype) {

        Optional<Playlist> playlist = workoutService.createPlaylist(length, activitytype);
        return playlist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());

    }

}
