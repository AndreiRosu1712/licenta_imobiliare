package com.licenta.rosulet.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "listings")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "description_text", columnDefinition = "TEXT")
    private String descriptionText;

    private String street;

    @Column(name = "street_number")
    private String streetNumber;

    private String sector;
    private String city;

    @Column(name = "location_text", columnDefinition = "TEXT")
    private String locationText;

    @Column(name = "price_total")
    private BigDecimal priceTotal;

    @Column(name = "price_currency")
    private String priceCurrency;

    @Column(name = "surface_area_sqm")
    private BigDecimal surfaceAreaSqm;

    private Integer rooms;

    @Column(name = "construction_year")
    private Integer constructionYear;

    @Column(name = "floor_display")
    private String floorDisplay;

    @Column(name = "total_floors")
    private Integer totalFloors;

    @Column(name = "heating_type")
    private String heatingType;

    @Column(name = "property_state")
    private String propertyState;

    @Column(name = "seller_type")
    private String sellerType;

    private String status = "ACTIVE";

    @ElementCollection
    @CollectionTable(
            name = "listing_selected_features",
            joinColumns = @JoinColumn(name = "listing_id")
    )
    @Column(name = "feature_code")
    private List<String> features = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        locationText = street + " " + streetNumber + ", Sector " + sector + ", " + city;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
        locationText = street + " " + streetNumber + ", Sector " + sector + ", " + city;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescriptionText() { return descriptionText; }
    public void setDescriptionText(String descriptionText) { this.descriptionText = descriptionText; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getStreetNumber() { return streetNumber; }
    public void setStreetNumber(String streetNumber) { this.streetNumber = streetNumber; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getLocationText() { return locationText; }

    public BigDecimal getPriceTotal() { return priceTotal; }
    public void setPriceTotal(BigDecimal priceTotal) { this.priceTotal = priceTotal; }

    public String getPriceCurrency() { return priceCurrency; }
    public void setPriceCurrency(String priceCurrency) { this.priceCurrency = priceCurrency; }

    public BigDecimal getSurfaceAreaSqm() { return surfaceAreaSqm; }
    public void setSurfaceAreaSqm(BigDecimal surfaceAreaSqm) { this.surfaceAreaSqm = surfaceAreaSqm; }

    public Integer getRooms() { return rooms; }
    public void setRooms(Integer rooms) { this.rooms = rooms; }

    public Integer getConstructionYear() { return constructionYear; }
    public void setConstructionYear(Integer constructionYear) { this.constructionYear = constructionYear; }

    public String getFloorDisplay() { return floorDisplay; }
    public void setFloorDisplay(String floorDisplay) { this.floorDisplay = floorDisplay; }

    public Integer getTotalFloors() { return totalFloors; }
    public void setTotalFloors(Integer totalFloors) { this.totalFloors = totalFloors; }

    public String getHeatingType() { return heatingType; }
    public void setHeatingType(String heatingType) { this.heatingType = heatingType; }

    public String getPropertyState() { return propertyState; }
    public void setPropertyState(String propertyState) { this.propertyState = propertyState; }

    public String getSellerType() { return sellerType; }
    public void setSellerType(String sellerType) { this.sellerType = sellerType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}