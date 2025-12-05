#!/bin/bash
set -euo pipefail

PACKAGE="@dsds/vue-vuetify"
VERSION="${1-}"

usage() {
  cat <<EOF
Usage: $(basename "$0") <version>

Arguments:
  <version>  Semantic version (e.g. 0.2.0-beta)

The script tags the current main tip with "${PACKAGE}@<version>" and pushes the tag to origin.
EOF
  exit 1
}

if [[ -z "$VERSION" ]]; then
  usage
fi

TAG="${PACKAGE}@${VERSION}"

if ! git diff --quiet --exit-code; then
  echo "❌ Working tree has uncommitted changes. Commit or stash before releasing." >&2
  exit 1
fi

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "❌ Tag $TAG already exists. Choose a different version." >&2
  exit 1
fi

echo "🚀 Creating release tag $TAG"
git tag "$TAG"
git push origin "$TAG"

echo "✅ Released $TAG"
