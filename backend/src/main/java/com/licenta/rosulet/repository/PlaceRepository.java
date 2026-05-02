package com.licenta.rosulet.repository;

import com.licenta.rosulet.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    List<Place> findByPlaceType(String placeType);
}