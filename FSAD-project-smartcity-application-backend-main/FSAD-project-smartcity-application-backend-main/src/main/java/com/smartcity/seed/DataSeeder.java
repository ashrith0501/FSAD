package com.smartcity.seed;

import com.smartcity.services.ServiceItem;
import com.smartcity.services.ServiceRepository;
import com.smartcity.user.User;
import com.smartcity.user.UserRepository;
import com.smartcity.user.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
  private final PasswordEncoder passwordEncoder;

  public DataSeeder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @Bean
  CommandLineRunner seed(ServiceRepository services, UserRepository users) {
    return args -> {
      if (services.count() == 0) {
        services.save(service("Water Supply", "Access to clean drinking water and supply information", "water"));
        services.save(service("Electricity", "Reliable power supply and billing services", "electricity"));
        services.save(service("Waste Management", "Waste collection schedules and recycling programs", "waste"));
        services.save(service("Public Transport", "Bus schedules, routes, and service alerts", "transport"));
        services.save(service("Internet & WiFi", "Public WiFi hotspots and broadband services", "utilities"));
      }

      if (!users.existsByEmail("admin@smartcity.com")) {
        User admin = new User();
        admin.setFullName("Admin");
        admin.setEmail("admin@smartcity.com");
        admin.setPhone(null);
        admin.setRole(UserRole.admin);
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        users.save(admin);
      }

      if (!users.existsByEmail("user@smartcity.com")) {
        User user = new User();
        user.setFullName("User");
        user.setEmail("user@smartcity.com");
        user.setPhone(null);
        user.setRole(UserRole.user);
        user.setPasswordHash(passwordEncoder.encode("user123"));
        users.save(user);
      }
    };
  }

  private ServiceItem service(String name, String description, String category) {
    ServiceItem s = new ServiceItem();
    s.setName(name);
    s.setDescription(description);
    s.setCategory(category);
    s.setStatus("active");
    return s;
  }
}

