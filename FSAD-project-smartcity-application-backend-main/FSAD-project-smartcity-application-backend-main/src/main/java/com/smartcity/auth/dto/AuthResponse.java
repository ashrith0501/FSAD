package com.smartcity.auth.dto;

public class AuthResponse {
  private String token;
  private AuthUserResponse user;

  public AuthResponse(String token, AuthUserResponse user) {
    this.token = token;
    this.user = user;
  }

  public String getToken() {
    return token;
  }

  public AuthUserResponse getUser() {
    return user;
  }
}

