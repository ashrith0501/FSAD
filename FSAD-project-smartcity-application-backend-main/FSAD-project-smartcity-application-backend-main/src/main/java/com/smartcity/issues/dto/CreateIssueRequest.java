package com.smartcity.issues.dto;

import com.smartcity.issues.IssuePriority;
import jakarta.validation.constraints.NotBlank;

public class CreateIssueRequest {
  @NotBlank
  private String title;

  @NotBlank
  private String category;

  @NotBlank
  private String description;

  @NotBlank
  private String location;

  private IssuePriority priority = IssuePriority.medium;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public IssuePriority getPriority() {
    return priority;
  }

  public void setPriority(IssuePriority priority) {
    this.priority = priority;
  }
}

