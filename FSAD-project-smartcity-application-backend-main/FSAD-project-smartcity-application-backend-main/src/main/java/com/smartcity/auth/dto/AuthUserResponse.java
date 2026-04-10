package com.smartcity.auth.dto;

import com.smartcity.user.UserRole;
public class AuthUserResponse {
  private Long id;
  private String fullName;
  private String email;
  private String phone;
  private UserRole role;

  public AuthUserResponse(Long id, String fullName, String email, String phone, UserRole role) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }

  public Long getId() {
    return id;
  }

  public String getFullName() {
    return fullName;
  }

  public String getEmail() {
    return email;
  }

  public String getPhone() {
    return phone;
  }

  public UserRole getRole() {
    return role;
  }
}

