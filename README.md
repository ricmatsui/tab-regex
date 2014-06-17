# Tab Regex

Advanced utility for renaming titles on tabs for Chrome. Useful for sites that do not have helpful naming conventions such as Bitbucket or GitHub for those with many tabs or smaller screens. Uses regex rules for replacing the titles and renames on the first match.

## Sample Rules

### Bitbucket

    /* Bitbucket Rules */
    // Source
    ([^/]+)\s+/\s+([^/]+)\s+/\s+source(.*)(Bitbucket)-->s / $2 / $1$3$4
    // Issues
    ([^/]+)\s+/\s+([^/]+)\s+/\s+issues\s+/\s+#(\d+)(.*)(Bitbucket)-->i$3 / $2 / $1$4$5
    ([^/]+)\s+/\s+([^/]+)\s+/\s+issues(.*)(Bitbucket)-->i / $2 / $1$3$4
    // Basic
    ([^/]+)\s+/\s+([^/]+)(.*)(Bitbucket)-->$2 / $1$3$4