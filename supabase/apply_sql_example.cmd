@echo off
setlocal DisableDelayedExpansion
REM Apply Supabase SQL scripts using Session Pooler credentials
REM Usage (PowerShell):
REM   $env:PGHOST     = "aws-1-ap-northeast-2.pooler.supabase.com"
REM   $env:PGPORT     = "5432"
REM   $env:PGDATABASE = "postgres"
REM   $env:PGUSER     = "postgres.gwmhplakcmlgzdskqrnw"
REM   $env:PGPASSWORD = "<your password>"
REM   supabase\apply_sql_example.cmd

if not defined PGHOST set "PGHOST=aws-1-ap-northeast-2.pooler.supabase.com"
if not defined PGPORT set "PGPORT=5432"
if not defined PGDATABASE set "PGDATABASE=postgres"
if not defined PGUSER set "PGUSER=postgres.gwmhplakcmlgzdskqrnw"

if not defined PGPASSWORD (
  echo [ERROR] PGPASSWORD environment variable is not set. Please set it before running this script.
  goto :error
)

set "PGSSLMODE=require"
set "PGCHANNELBINDING=disable"

where psql >nul 2>&1 || ( echo [ERROR] psql not found in PATH. Install PostgreSQL client or add to PATH. & goto :error )

call :run_sql 00_extensions.sql
call :run_sql 01_types.sql
call :run_sql 10_tables.sql
call :run_sql 15_vector_tables.sql
call :run_sql 05_functions.sql
call :run_sql 20_rls.sql

echo [OK] All SQL scripts applied successfully.
exit /b 0

:run_sql
echo Applying %1
psql -h "%PGHOST%" -p "%PGPORT%" -d "%PGDATABASE%" -U "%PGUSER%" -v ON_ERROR_STOP=1 -f "%~dp0\%1" || goto :error
goto :eof

:error
echo [FAIL] Failed to apply SQL scripts.
exit /b 1
