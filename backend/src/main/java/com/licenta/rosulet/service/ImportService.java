package com.licenta.rosulet.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.rosulet.entity.Place;
import com.licenta.rosulet.entity.PlaceLine;
import com.licenta.rosulet.repository.PlaceLineRepository;
import com.licenta.rosulet.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Iterator;

@Service
@RequiredArgsConstructor
public class ImportService {

    private final PlaceRepository placeRepository;
    private final PlaceLineRepository placeLineRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void importAll() throws Exception {

        importFile("Farmacii/farmacii_bucuresti_simple.json", "PHARMACY", "PHARMACY", false);

        importFile("Invatamant/gradinite_bucuresti.json", "EDUCATION", "KINDERGARTEN", false);
        importFile("Invatamant/scoli_bucuresti.json", "EDUCATION", "SCHOOL", false);
        importFile("Invatamant/licee_bucuresti.json", "EDUCATION", "HIGH_SCHOOL", false);
        importFile("Invatamant/universitati_facultati_bucuresti.json", "EDUCATION", "UNIVERSITY", false);

        importFile("Mall/malluri_bucuresti.json", "MALL", "SHOPPING_CENTER", false);
        importFile("Market/magazine_comerciale_bucuresti.json", "MARKET", "SUPERMARKET", false);

        importFile("Metrou/statii_metrou_bucuresti.json", "METRO", "STATION", true);
        importFile("Tramvai/statii_tramvai_bucuresti.json", "TRAM", "STATION", true);
        importFile("Troleibuze/statii_troleibuz_stb_bucuresti_ilfov.json", "TROLLEYBUS", "STATION", true);

        importFile("Parc/parcuri_bucuresti.json", "PARK", "PARK", false);
        importFile("Politie/sectii_politie_bucuresti.json", "POLICE", "POLICE_STATION", false);

        importFile("Restaurante/restaurante_bucuresti.json", "FOOD", "RESTAURANT", false);
        importFile("Restaurante/cafenele_bucuresti.json", "FOOD", "CAFE", false);

        importFile("Spitale/spitale_bucuresti.json", "HEALTHCARE", "HOSPITAL", false);
    }

    private void importFile(String path, String placeType, String subtype, boolean hasLines) throws Exception {

        File file = new File("D:/Facultate/An 4/Licenta/storia_scraper/" + path);

        JsonNode root = objectMapper.readTree(file);

        for (JsonNode node : root) {

            String name = node.path("nume").asText();

            // 🔴 EXCLUDE gradinite din scoli
            if (subtype.equals("SCHOOL") && name.toLowerCase().contains("gradinita")) {
                continue;
            }

            double lat = node.path("lat").asDouble();
            double lon = node.path("long").asDouble();

            Place place = Place.builder()
                    .name(name)
                    .placeType(placeType)
                    .subtype(subtype)
                    .latitude(lat)
                    .longitude(lon)
                    .status(node.path("status").asText("existent"))
                    .source(path)
                    .build();

            place = placeRepository.save(place);

            if (hasLines && node.has("linii")) {

                Iterator<JsonNode> lines = node.get("linii").elements();

                while (lines.hasNext()) {
                    String line = lines.next().asText();

                    PlaceLine placeLine = PlaceLine.builder()
                            .lineName(line)
                            .transportType(placeType)
                            .place(place)
                            .build();

                    placeLineRepository.save(placeLine);
                }
            }
        }
    }
}