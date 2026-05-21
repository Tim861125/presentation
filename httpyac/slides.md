---
theme: seriph
background: https://cover.sli.dev
title: httpYac Technical Overview
info: |
  ## httpYac - HTTP Request Development Tool
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# httpYac

HTTP Request Development Tool

---
layout: default
---

# Overview

<v-clicks>

## What is httpYac?

A **free** and **extensible** development tool for creating, executing, and storing HTTP requests

## Implementations

- **VS Code extension** - for creating and executing requests
- **CLI application** - enables integration into CI/CD for testing HTTP requests
- **httpBook** - for documenting requests in Jupyter Notebook format

</v-clicks>

---
layout: default
---

# Protocol & Authentication Support

<v-clicks>

## Supported Protocols

- REST
- GraphQL
- gRPC

## Authentication Methods

- OAuth2
- OpenID Connect
- AWS Signature v4
- Digest Auth
- SSL Client Certificates
- Custom authentication flows

</v-clicks>

---
layout: default
---

# Philosophy

Source: https://httpyac.github.io/guide/

<v-clicks>

## Standards-Based Approach

The tool follows established standards where possible

## Request Language

Based on **RFC 7230** with extensions to simplify request creation and editing

## File Format Support

Executes `*.http` and `*.rest` files

</v-clicks>

---

# CLI Installation

## Install

```bash
# npm
npm install -g httpyac

# yarn
yarn global add httpyac
```

## Upgrade

```bash
# npm
npm update -g httpyac

# yarn
yarn global upgrade --latest httpyac
```

---
layout: default
---

# CLI Commands

## Operations
<br>
<v-clicks>

### 1. OAuth2 Token Generation

```bash
httpyac oauth2 [options]
```
<br>

### 2. Send/Execute HTTP Files

```bash
httpyac send [options] <fileName...>
```

</v-clicks>

---
layout: default
---

# CLI Send Options

<v-clicks>

```bash
-a, --all          # Execute all requests in a file
-e, --env          # Specify environments
-l, --line         # Target specific request lines
-n, --name         # Filter by request name
--json             # Output results as JSON
--timeout          # Set connection timeout
```

</v-clicks>

---
layout: default
---

# OAuth2 Example: Client Credentials

## Variables Setup

```http
@api_clientId=your-client-id
@api_clientSecret=your-secret
@api_tokenEndpoint=https://auth.example.com/token
@api_useAuthorizationHeader=false
```
<br>

## Making Authenticated Request

```http
###
GET https://api.example.com/v1/users
Authorization: oauth2 client_credentials api
```

---
layout: default
---

# OAuth2 Example: OpenID Connect

```http
# OpenID Connect Configuration
@keycloakHost = https://auth.example.com
@local_tokenEndpoint = {{keycloakHost}}/realms/demo/protocol/openid-connect/token
@local_clientId = my-app
@local_clientSecret = 936DA01F-9ABD-4D9D-80C7-02AF85C822A8
@local_scope = openid profile email

###
# Request with OpenID Connect
GET https://api.example.com/secured_service
Authorization: openid client_credentials local
```

---
layout: default
---

# OAuth2 Example: Implicit Flow

Source: https://httpyac.github.io/guide/

<v-clicks>

```http
# Implicit Flow (Browser-based Authentication)
@oauth2_clientId=your-app-id
@oauth2_authorizationEndpoint=https://auth.example.com/oauth2/authorize
@oauth2_tokenEndpoint=https://auth.example.com/oauth2/token
@oauth2_redirectUri=http://localhost:3000

###
# This will open a browser for authentication
GET https://api.example.com/v1/me
Authorization: openid implicit
```

**Note**: httpYac automatically opens a browser and handles the token redirect

</v-clicks>
