package com.smartcity.issues;

import com.smartcity.issues.dto.CreateIssueRequest;
import com.smartcity.issues.dto.UpdateIssueRequest;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/issues")
public class IssueController {
  private final IssueRepository issueRepository;

  public IssueController(IssueRepository issueRepository) {
    this.issueRepository = issueRepository;
  }

  @GetMapping
  public List<Issue> list() {
    List<Issue> all = issueRepository.findAll();
    all.sort(Comparator.comparing(Issue::getCreatedAt).reversed());
    return all;
  }

  @PostMapping
  public Issue create(@Valid @RequestBody CreateIssueRequest req) {
    Issue i = new Issue();
    i.setTitle(req.getTitle());
    i.setCategory(req.getCategory());
    i.setDescription(req.getDescription());
    i.setLocation(req.getLocation());
    i.setPriority(req.getPriority());
    return issueRepository.save(i);
  }

  @PutMapping("/{id}")
  public Issue update(@PathVariable Long id, @Valid @RequestBody UpdateIssueRequest req) {
    Issue issue =
        issueRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found"));

    if (req.getStatus() != null) {
      issue.setStatus(req.getStatus());
    }
    if (req.getResponse() != null) {
      issue.setResponse(req.getResponse());
    }

    return issueRepository.save(issue);
  }
}
