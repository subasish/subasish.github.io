---
layout: post
title: "Linux: Useful Commands"
date: 2014-10-23 23:40:14 +0300
comments: true
categories: Linux
---
File related:

    pwd: Print current working directory. In bash shell, the current working directory is also shown in the command prompt.
    cd pathname: Change current working directory. The pathname could be either absolute or relative (to the current working directory). Special notations "." and ".." refer to the current and parent directories, respectively.
    ls: List files (in short-format). "ls -l" lists file in long-format; "ls -a" lists also the hidden files.
    cat: Concatenate files and print its content.
    less, more: View file in pages.
    head, tail: Print the first part or last part of the file.
    mkdir, rmdir: Make directory or remove (delete) empty directory.
    touch filename: Create the file if it does not exist; otherwise, update the last-modified timestamp.
    cp, mv, rm: copy, move or remove (delete) files.
    chmod, chown, chgrp: change file mode, owner, or group.
    ln: Create link.

Resource related:

    ps: List processes. "ps aux | grep process-name" to list the details of a particular process.
    df: Report file system disk space usage.
    export name=value: Set a variable and export to global environment.
    top: Print resource usage and top processes.
    who: List all login users.
    whoami: Print current login user.
    hostname: Print hostname.
    uptime: Print how long the system has been running.
    date: Print date/time.
    du: Print disk file space usage.

Utilities:

    grep: Search for a string in input.
    find: Find files.
    which program-name: Print the location of the program-name.
    whereis program-name: List all files related to the program-name.
    whatis program-name: Print one-line description of program-name.
    locate filename: Search for files in local system.
    man command-name: Display manual pages for the command.

Editors:

    vi/vim, nano, emacs: Console-based (text-based) editors.
    gedit: graphical text editor.

Programming:

    make: Install programs.
    gcc, g++: GNU C/C++ compiler.

