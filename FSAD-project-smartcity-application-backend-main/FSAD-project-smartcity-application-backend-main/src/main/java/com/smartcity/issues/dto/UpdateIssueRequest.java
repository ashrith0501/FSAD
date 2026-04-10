package com.smartcity.issues.dto;

import com.smartcity.issues.IssueStatus;

public class UpdateIssueRequest {
  private IssueStatus status;
  private String response;

  public IssueStatus getStatus() {
    return status;
  }

  public void setStatus(IssueStatus status) {
    this.status = status;
  }

  public String getResponse() {
    return response;
  }

  public void setResponse(String response) {
    this.response = response;
  }
}

