{{/*
Expand the name of the chart.
*/}}
{{- define "cms.name" -}}
{{- printf "cms" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "cms.fullname" -}}
{{- $componentName := include "cms.name" .  }}
{{- if .Values.cms.fullnameOverride }}
{{- .Values.cms.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $componentName | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "cms.labels" -}}
{{ include "cms.selectorLabels" . }}
{{- if .Values.global.tag }}
app.kubernetes.io/image-version: {{ .Values.global.tag | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/short-name: {{ include "cms.name" . }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "cms.selectorLabels" -}}
app.kubernetes.io/name: {{ include "cms.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}


