package com.licenta.rosulet.controller;

import com.licenta.rosulet.service.ImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/import")
@RequiredArgsConstructor
public class ImportController {

    private final ImportService importService;

    @PostMapping
    public String importData() throws Exception {
        importService.importAll();
        return "Import done!";
    }
}