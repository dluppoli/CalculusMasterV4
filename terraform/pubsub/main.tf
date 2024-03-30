resource "google_pubsub_topic" "topic" {
  name = var.topicname
}

resource "google_pubsub_subscription" "subscription" {
  name  = "bucket-subscription"
  topic = google_pubsub_topic.topic.id

  cloud_storage_config {
    bucket = var.bucketname

    filename_prefix = "app-server-logs/log-"
    filename_suffix = ".json"

    max_bytes = 1000
    max_duration = "300s"
  }
  depends_on = [ 
    google_storage_bucket_iam_member.admin,
  ]
}

data "google_project" "project" {
}

resource "google_storage_bucket_iam_member" "admin" {
  bucket = var.bucketname
  role   = "roles/storage.admin"
  member = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-pubsub.iam.gserviceaccount.com"
}