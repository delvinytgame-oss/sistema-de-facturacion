@echo off
cd /d "%~dp0"
git show stash@{0} --name-status > stash_files.txt
git show stash@{1} --name-status >> stash_files.txt
echo DONE
