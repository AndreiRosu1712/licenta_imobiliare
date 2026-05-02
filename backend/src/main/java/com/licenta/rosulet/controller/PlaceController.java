package com.licenta.rosulet.controller;

import com.licenta.rosulet.entity.Place;
import com.licenta.rosulet.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/type/{placeType}")
    public List<Place> getPlacesByType(@PathVariable String placeType) {
        return placeService.getPlacesByType(placeType);
    }

    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return placeService.createPlace(place);
    }
}