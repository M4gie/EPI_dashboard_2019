##
## DASHBOARD, 2019
## Makefile
## File description:
## Makefile REGNAULT Steeven
##


CONTAINER_NAME	=	api_dashboard

run		:
			@echo 'Starting migration...'
			@docker exec -it $(CONTAINER_NAME) node ace migration:run --force && echo 'Migration finished.'

seed		:
			@echo 'Seeding database...'
			@docker exec -it $(CONTAINER_NAME) node ace seed --force && echo 'Database seeded.'

reset		:
			@echo 'Rollback migration to the first batch...'
			@docker exec -it $(CONTAINER_NAME) node ace migration:reset --force && echo 'Resetting the completed database.'

rollback	:
			@echo 'Rollback migration to latest batch or to a specific batch number...'
			@docker exec -it $(CONTAINER_NAME) node ace migration:rollback --force && echo 'Undoing the last migration performed.'
refresh		:
			@echo 'Refresh migrations by performing rollback and then running from start...'
			@docker exec -it $(CONTAINER_NAME) node ace migration:refresh --seed --force && echo 'Undoing the last migration performed & resetting the completed database.'
