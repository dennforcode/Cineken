@echo off
echo Updating Supabase types...
npx supabase gen types typescript --project-id jomuzeliojlrvvtrpbfy > database.types.ts
echo Types successfully updated in database.types.ts!
pause
