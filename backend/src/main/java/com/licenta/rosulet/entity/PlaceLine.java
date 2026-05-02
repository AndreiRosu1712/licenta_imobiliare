package com.licenta.rosulet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lineName;

    private String transportType;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;
}