package com.smartcity.feedback;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

  private final FeedbackRepository repository;

  public FeedbackController(FeedbackRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Feedback> list() {
    return repository.findAllByOrderByCreatedAtDesc();
  }

  @GetMapping("/stats")
  public Map<String, Object> stats() {
    List<Feedback> all = repository.findAll();
    int count = all.size();
    double avg =
        count == 0
            ? 0
            : all.stream().mapToInt(Feedback::getRating).average().orElse(0);

    Map<String, Object> result = new HashMap<>();
    result.put("count", count);
    result.put("averageRating", Math.round(avg * 10.0) / 10.0);
    return result;
  }

  @PostMapping
  public Feedback create(@Valid @RequestBody CreateFeedbackRequest req) {
    Feedback f = new Feedback();
    f.setName(req.getName());
    f.setEmail(req.getEmail());
    f.setCategory(req.getCategory());
    f.setRating(req.getRating());
    f.setMessage(req.getMessage());
    return repository.save(f);
  }

  public static class CreateFeedbackRequest {
    @NotBlank private String name;
    @NotBlank private String email;
    @NotBlank private String category;

    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank private String message;

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getCategory() {
      return category;
    }

    public void setCategory(String category) {
      this.category = category;
    }

    public int getRating() {
      return rating;
    }

    public void setRating(int rating) {
      this.rating = rating;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }
}

