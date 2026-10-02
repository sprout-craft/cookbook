"""
Sprout Craft Engineering Cookbook
Recipe #27: Pydantic V2 Robust Domain Model & Custom Field Validation

Problem: Parsing untrusted external API inputs into strongly typed domain entities.
"""

import re
from pydantic import BaseModel, Field, field_validator


class UserRegistrationDTO(BaseModel):
    username: str = Field(..., min_length=3, max_length=30)
    email: str
    phone_number: str

    @field_validator("email")
    @classmethod
    def validate_email_domain(cls, v: str) -> str:
        cleaned = v.strip().lower()
        if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", cleaned):
            raise ValueError("Malformed email address")
        return cleaned

    @field_validator("phone_number")
    @classmethod
    def sanitize_phone(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if len(digits) not in (10, 11):
            raise ValueError("Phone number must contain 10 or 11 digits")
        return digits
