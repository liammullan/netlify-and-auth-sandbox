package com.ometa.workout.service;

import com.ometa.workout.api.models.ActivityType;
import com.ometa.workout.api.models.Playlist;
import com.ometa.workout.api.models.VideoSnippet;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Override
    public Optional<Playlist> createPlaylist(Integer length, ActivityType activitytype) {
        VideoSnippet snippet = new VideoSnippet().start(5).end(10).youtubeid("blahblah").description("Liam's Description 2");
        Playlist playlist = new Playlist().snippets(newArrayList(snippet));
        return Optional.of(playlist);
    }
}
