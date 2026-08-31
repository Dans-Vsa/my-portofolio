#!/bin/bash

# Auto Git Push - Per File, 1 commit per file with Auto Conventional Commits & Date Loop
# Usage: ./amend.sh ["optional custom message"]

CUSTOM_MSG="$1"

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a git repository!"
    exit 1
fi

BRANCH=$(git symbolic-ref --quiet --short HEAD 2>/dev/null || true)
if [ -z "$BRANCH" ]; then
    BRANCH=$(git branch --show-current 2>/dev/null || true)
fi

if [ -z "$BRANCH" ]; then
    echo "❌ Cannot detect current branch. Are you in detached HEAD?"
    exit 1
fi

echo "🚀 Auto Git Push with Loop Date (Conventional Commits)"
echo "=========================================="
echo " Branch  : $BRANCH"
if [ -n "$CUSTOM_MSG" ]; then
    echo " Mode    : Custom Message ($CUSTOM_MSG)"
else
    echo " Mode    : Auto Conventional Commits ⚡"
fi
echo "=========================================="

echo "🔍 Repository status:"
git status --short
echo ""

COUNT=0

# Date configuration for amended commits.
# Change these values if you want a different synthetic date range.
AMEND_YEAR=2025
AMEND_MONTH=1
AMEND_START_DAY=1
AMEND_END_DAY=13
AMEND_HOUR=10
AMEND_MINUTE=00
AMEND_SECOND=00

CURRENT_DAY=$AMEND_START_DAY

# ── Auto Conventional Commit Message Generator ──────────────────────────────
generate_commit_msg() {
    local file="$1"
    local status="$2"
    local custom_msg="$3"

    # Handle rename format "old -> new"
    if [[ "$file" == *" -> "* ]]; then
        file="${file##* -> }"
    fi

    local filename=$(basename -- "$file")
    local dirname_path=$(dirname -- "$file")
    local dirname_base=$(basename -- "$dirname_path")
    local name_only="${filename%.*}"
    local ext="${filename##*.}"
    [[ "$filename" == "$ext" ]] && ext=""

    # 1. Tentukan Scope yang bersih
    local scope=""
    if [[ "$name_only" =~ ^(index|main|app|default)$ && "$dirname_base" != "." && -n "$dirname_base" ]]; then
        scope=$(echo "$dirname_base" | tr '[:upper:]' '[:lower:]' | tr ' _' '-')
    else
        scope=$(echo "$name_only" | tr '[:upper:]' '[:lower:]' | tr ' _' '-')
    fi
    [[ -z "$scope" ]] && scope="root"

    # Jika user memberikan custom message eksplisit
    if [ -n "$custom_msg" ]; then
        local type="chore"
        if [[ "$filename" =~ ^(package\.json|package-lock\.json|pnpm-lock\.yaml|yarn\.lock)$ ]]; then type="build";
        elif [[ "$filename" == *.md || "$filename" == LICENSE* ]]; then type="docs";
        elif [[ "$file" =~ (test|spec) ]]; then type="test";
        elif [[ "$filename" =~ \.(css|scss|sass|less)$ || "$file" =~ (style|theme) ]]; then type="style";
        elif [[ "$filename" =~ \.(sol|rs|go|py|js|jsx|ts|tsx|php|java|c|cpp|vue|svelte)$ ]]; then
            if [[ "$status" == "A" || "$status" == "??" ]]; then type="feat"; else type="refactor"; fi
        fi
        echo "$type($scope): $custom_msg"
        return
    fi

    # 2. Logic Otomatis Conventional Commit

    # --- A. Dependencies & Build System ---
    if [[ "$filename" =~ ^(package\.json|package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|Cargo\.toml|Cargo\.lock|go\.mod|go\.sum|requirements\.txt|Gemfile|composer\.json)$ ]]; then
        echo "build(deps): update dependencies and project config"
        return
    fi

    # --- B. CI/CD & Tooling Configurations ---
    if [[ "$file" =~ ^\.github/(workflows|actions) ]]; then
        echo "ci($scope): update CI workflow configuration"
        return
    fi
    if [[ "$filename" =~ ^(\.env|\.env\..*|\.gitignore|\.dockerignore|docker-compose.*|Dockerfile|tsconfig.*|vite\.config.*|webpack.*|babel.*|eslint.*|prettier.*|tailwind\.config.*|postcss.*|next\.config.*|nuxt\.config.*|astro\.config.*|turbo\.json)$ ]]; then
        echo "chore($scope): update configuration"
        return
    fi

    # --- C. Documentation ---
    if [[ "$filename" == *.md || "$filename" == *.txt || "$filename" == LICENSE* ]]; then
        if [[ "$status" == "D" ]]; then
            echo "docs($scope): remove $filename"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "docs($scope): add $filename documentation"
        else
            echo "docs($scope): update documentation"
        fi
        return
    fi

    # --- D. Unit Tests ---
    if [[ "$file" =~ (test|spec|__tests__) ]]; then
        if [[ "$status" == "D" ]]; then
            echo "test($scope): remove test suite"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "test($scope): add tests for $scope"
        else
            echo "test($scope): update unit tests"
        fi
        return
    fi

    # --- E. Stylesheets ---
    if [[ "$filename" =~ \.(css|scss|sass|less|styl)$ || "$file" =~ (styles|stylesheet|theme) ]]; then
        if [[ "$status" == "D" ]]; then
            echo "style($scope): remove $filename"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "style($scope): add styling rules"
        else
            echo "style($scope): update styles and layout"
        fi
        return
    fi

    # --- F. Smart Contracts ---
    if [[ "$filename" == *.sol ]]; then
        if [[ "$status" == "D" ]]; then
            echo "chore($scope): remove $filename contract"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "feat($scope): implement $name_only smart contract"
        else
            echo "refactor($scope): update $name_only contract logic"
        fi
        return
    fi

    # --- G. Assets & Media ---
    if [[ "$filename" =~ \.(png|jpg|jpeg|gif|svg|ico|webp|avif|mp4|webm|woff|woff2|ttf|eot)$ ]]; then
        if [[ "$status" == "D" ]]; then
            echo "chore($scope): remove $filename asset"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "chore($scope): add $filename asset"
        else
            echo "chore($scope): update $filename asset"
        fi
        return
    fi

    # --- H. Shell & Automation Scripts ---
    if [[ "$filename" =~ \.(sh|bash|zsh|bat|cmd|ps1)$ ]]; then
        if [[ "$status" == "D" ]]; then
            echo "chore($scope): remove $filename script"
        elif [[ "$status" == "A" || "$status" == "??" ]]; then
            echo "chore($scope): add $filename script"
        else
            echo "chore($scope): update $filename script"
        fi
        return
    fi

    # --- I. Source Code / Fallback Heuristics ---
    case "$status" in
        D)
            echo "chore($scope): remove $filename"
            ;;
        R*)
            echo "refactor($scope): rename to $filename"
            ;;
        A|"??")
            echo "feat($scope): add $name_only implementation"
            ;;
        M)
            echo "refactor($scope): update $name_only logic"
            ;;
        *)
            echo "chore($scope): update $filename"
            ;;
    esac
}

# ── Process all changed files ────────────────────────────────────────────────
while IFS= read -r line; do
    [[ -z "$line" ]] && continue

    STATUS="${line:0:2}"
    FILE="${line:3}"

    # Trim leading/trailing spaces
    STATUS_CLEAN="${STATUS// /}"

    # Handle rename file string "old -> new"
    ACTUAL_FILE="$FILE"
    if [[ "$FILE" == *" -> "* ]]; then
        ACTUAL_FILE="${FILE##* -> }"
    fi

    COMMIT_MSG=$(generate_commit_msg "$FILE" "$STATUS_CLEAN" "$CUSTOM_MSG")

    case "$STATUS_CLEAN" in
        D)
            git rm --cached "$ACTUAL_FILE" 2>/dev/null || git rm "$ACTUAL_FILE" 2>/dev/null
            git commit -m "$COMMIT_MSG"
            ;;
        R*)
            git add "$ACTUAL_FILE" 2>/dev/null || git add -A
            git commit -m "$COMMIT_MSG"
            ;;
        *)
            git add "$ACTUAL_FILE"
            git commit -m "$COMMIT_MSG"
            ;;
    esac

    # Build the amended commit date from the config block above.
    COMMIT_DATE=$(printf "%04d-%02d-%02d %02d:%02d:%02d" \
        "$AMEND_YEAR" \
        "$AMEND_MONTH" \
        "$CURRENT_DAY" \
        "$AMEND_HOUR" \
        "$AMEND_MINUTE" \
        "$AMEND_SECOND")
    
    git commit --amend --no-edit --date="$COMMIT_DATE" > /dev/null
    echo "  ✔ $COMMIT_MSG (date: $COMMIT_DATE)"

    # Increment day and loop back to the start of the configured range.
    CURRENT_DAY=$((CURRENT_DAY + 1))
    if [ "$CURRENT_DAY" -gt "$AMEND_END_DAY" ]; then
        CURRENT_DAY=$AMEND_START_DAY
    fi

    COUNT=$((COUNT + 1))

done < <(git status --short)

# ── Push ─────────────────────────────────────────────────────────────────────
echo ""

LOCAL_AHEAD=$(git rev-list --count origin/"$BRANCH".."$BRANCH" 2>/dev/null || echo "0")

if [ "$COUNT" -gt 0 ] || [ "$LOCAL_AHEAD" -gt 0 ]; then
    if [ "$LOCAL_AHEAD" -gt 0 ]; then
        echo "📤 Local branch is ahead by $LOCAL_AHEAD commit(s)."
    fi
    echo "📤 Pushing to origin/$BRANCH..."
    if git push origin "$BRANCH"; then
        echo "=========================================="
        echo "✅ Done! $COUNT commit(s) pushed with synthetic dates."
        echo "=========================================="
    else
        echo "=========================================="
        echo "❌ Push failed!"
        echo "=========================================="
        exit 1
    fi
else
    echo "=========================================="
    echo " Nothing to commit. Working tree clean."
    echo "=========================================="
fi
