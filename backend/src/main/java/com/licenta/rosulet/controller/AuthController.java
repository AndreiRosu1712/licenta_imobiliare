package com.licenta.rosulet.controller;

import com.licenta.rosulet.dto.LoginRequest;
import com.licenta.rosulet.dto.RegisterRequest;
import com.licenta.rosulet.entity.User;
import com.licenta.rosulet.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "User created";
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}