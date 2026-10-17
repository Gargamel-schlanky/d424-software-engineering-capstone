package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.User;
import com.D424.capstone.Repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/check-admin")
    public ResponseEntity<Map<String, Boolean>> checkAdminExists() {
        boolean hasAdmin = userRepository.existsByUsername("administrator") || userRepository.existsByRole("ADMIN");
        Map<String, Boolean> response = new HashMap<>();
        response.put("hasAdmin", hasAdmin);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByUsername("administrator") || userRepository.existsByRole("ADMIN")) {
            response.put("success", false);
            response.put("message", "Administrator account has already been registered.");
            return ResponseEntity.badRequest().body(response);
        }

        String username = payload.getOrDefault("username", "administrator");
        String password = payload.get("password");

        if (password == null || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password cannot be empty.");
            return ResponseEntity.badRequest().body(response);
        }

        User adminUser = new User("administrator", password, "ADMIN");
        userRepository.save(adminUser);

        response.put("success", true);
        response.put("message", "Administrator account successfully registered.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || password == null) {
            response.put("authenticated", false);
            response.put("message", "Username and password are required.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            response.put("authenticated", true);
            response.put("username", userOpt.get().getUsername());
            response.put("role", userOpt.get().getRole());
            return ResponseEntity.ok(response);
        } else {
            response.put("authenticated", false);
            response.put("message", "Invalid username or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
