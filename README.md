# Found24 Internal Admin Portal

## Overview

This portal is strictly an **internal cockpit** for Found24 operations. We do not expose any billing or subscription features to end users. All financials are managed outside this interface.

## Portal Purpose

This is an internal administrative interface designed for:
- **Operations Management**: Configure organizational settings and workflows
- **Team Coordination**: Manage internal team members, roles, and permissions
- **System Configuration**: Set up integrations, security policies, and branding
- **Performance Monitoring**: Track usage, system health, and operational metrics

## Key Features

### Organization Settings
- **General Configuration**: Company information, contact details, data policies
- **Team Management**: Internal user access, role assignment, department organization
- **Security Controls**: SSO setup, 2FA policies, IP restrictions, encryption settings
- **System Integrations**: Slack, Calendar, HRIS, Email, and custom webhook configurations
- **Brand Customization**: Logo upload, color schemes, email templates
- **Usage Monitoring**: API limits, storage usage, active users, system performance

### What's NOT Included
- ❌ Billing management or payment processing
- ❌ Subscription plans or seat pricing
- ❌ Customer-facing features
- ❌ External user registration
- ❌ Financial reporting or invoicing

## Architecture

This is built as a **responsive web application** targeting:
- **Desktop**: 1440×1024px primary viewport
- **Tablet**: 834×1112px adaptive layout
- **Mobile**: 375×812px optimized interface

## Design System

- **Grid System**: 8px base grid with Auto Layout
- **Brand Colors**: Deep Warm Green (#2E5E47), Mustard (#E4B063), Soft Orange (#F2A65A)
- **Typography**: Inter font family with 700 weight headings, 400 weight body text
- **Components**: Shared component library with glass-morphism styling

## Usage Guidelines

This portal should only be accessed by authorized Found24 internal staff. All configuration changes should be tested in staging environments before being applied to production systems.

For technical support or feature requests, contact the Found24 Technology Team.

---

**Important**: This interface is for internal operations only. Customer-facing features and billing management are handled through separate systems.
