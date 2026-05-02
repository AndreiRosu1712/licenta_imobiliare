package com.licenta.rosulet.service;

import com.licenta.rosulet.entity.Place;
import com.licenta.rosulet.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public List<Place> getPlacesByType(String placeType) {
        return placeRepository.findByPlaceType(placeType);
    }

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }
}