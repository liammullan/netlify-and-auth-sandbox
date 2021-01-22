package com.ometa.workout.service;

import com.ometa.workout.api.models.ActivityType;
import com.ometa.workout.api.models.Playlist;

import java.util.Optional;


public interface WorkoutService {
    Optional<Playlist> createPlaylist(Integer length, ActivityType activitytype);
}
