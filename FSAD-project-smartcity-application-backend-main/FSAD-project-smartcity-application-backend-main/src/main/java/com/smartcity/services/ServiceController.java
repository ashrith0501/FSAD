package com.smartcity.services;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
  private final ServiceRepository repository;

  public ServiceController(ServiceRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<ServiceItem> list() {
    return repository.findAll();
  }

  @PostMapping
  public ServiceItem create(@RequestBody ServiceItem payload) {
    ServiceItem item = new ServiceItem();
    item.setName(payload.getName());
    item.setDescription(payload.getDescription());
    item.setCategory(payload.getCategory());
    item.setStatus(payload.getStatus() == null ? "active" : payload.getStatus());
    return repository.save(item);
  }

  @PutMapping("/{id}")
  public ServiceItem update(@PathVariable Long id, @RequestBody ServiceItem payload) {
    ServiceItem item =
        repository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

    if (payload.getName() != null) item.setName(payload.getName());
    if (payload.getDescription() != null) item.setDescription(payload.getDescription());
    if (payload.getCategory() != null) item.setCategory(payload.getCategory());
    if (payload.getStatus() != null) item.setStatus(payload.getStatus());

    return repository.save(item);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!repository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
    }
    repository.deleteById(id);
  }
}

