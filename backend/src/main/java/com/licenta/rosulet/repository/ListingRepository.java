package com.licenta.rosulet.repository;

import com.licenta.rosulet.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Long> {
}