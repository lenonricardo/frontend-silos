<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="500"
		bottom
      offset-x
    >
	  <template v-slot:activator="{ on, attrs }">
			<v-btn icon @click.stop="menu = !menu">
				<v-badge
					:content="messages"
					:value="messages"
					small
					overlap
					color="red"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon style="font-size: 24px!important" large>mdi-bell</v-icon>
				</v-badge>
			</v-btn>
		</template>

      <v-card max-height="50vh" style="padding-bottom: 20px; padding-right: 10px">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Central de Notificações</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

			<v-list dense>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
				>
					<v-list-item-content class="pb-0">
						<div style="display: flex; align-items: center; margin-top: 10px">
							<v-btn
								v-if="items.length"
								icon
								@click="removeItem(i)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-alert
								dense
								type="success"
								text
								style="padding-right: 5px; margin-bottom: 0px !important"
							>
								{{item.message}}
							</v-alert>
						</div>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<div style="width: 100%; display: flex; justify-content: center">
				<span
					v-if="!items.length"
					style="font-size: 10px; color: #c0c0c0; text-align: center"
				>
					&lt;Não há notificações&gt;
				</span>
			</div>
      </v-card>
    </v-menu>
  </div>
</template>

<!--<template>
<v-sheet
	id="teste"
	height="100%"
	class="overflow-hidden"
	style="position: relative;"
>
	<v-container class="fill-height" style="margin-left: 0px !important; padding: 0px 0px 0px 0px !important">
		<slot></slot>
	</v-container>

	<v-navigation-drawer
		v-model="toggleDrawer"
		width="45vh"
		absolute
		right
		temporary
	>
		<v-divider></v-divider>
		<div>
			<v-subheader><h1>Central de Notificações</h1>
			<v-spacer/>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-if="items.length"
							icon
							v-bind="attrs"
							v-on="on"
							@click="clear"
						>
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</template>
					<span>Limpar</span>
				</v-tooltip>
			</v-subheader>
			<v-divider/>
			<v-list dense>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
				>
					<v-list-item-content class="pb-0">
						<div style="display: flex; align-items: center; margin-top: 10px">
							<v-btn
								v-if="items.length"
								icon
								@click="removeItem(i)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-alert
								dense
								type="success"
								text
								style="padding-right: 5px; margin-bottom: 0px !important"
							>
								{{item.message}}
							</v-alert>
						</div>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<div style="width: 100%; display: flex; justify-content: center">
				<span
					v-if="!items.length"
					style="font-size: 10px; color: #c0c0c0; text-align: center"
				>
					&lt;Não há notificações&gt;
				</span>
			</div>
		</div>
	</v-navigation-drawer>
</v-sheet>
</template>-->


<script>
import EventBus from '../EventBus'

export default {
	data () {
		return {
		items: [
			{ message: 'Parabéns, 95% da sua amostra são grãos sadios!'},
			{ message: 'Parabéns, 92% da sua amostra são grãos sadios!'},
			{ message: 'Parabéns, 86% da sua amostra são grãos sadios!'},
			],
		menu: false
		}
	},

	props: {
		drawer: { type: Boolean },
		messages: { type: Number }
	},

	computed: {
		toggleDrawer: {
			get(){
				return this.drawer
			},
			set(newValue){
				return newValue
			}
		}
	},

	watch: {
		items: function(newValue) {
			this.$emit('update:messages', newValue.length)
		}
	},

	mounted () {
		EventBus.$on('atualizarNotificacoes', (msg) => {
			this.items.unshift(msg)
		})

		this.$emit('update:messages', this.items.length)
	},

	methods: {
		clear() {
			this.items = []
		},

		removeItem(i) {
			this.items.splice(i, 1)
		}
	}
}
</script>

<style lang="sass">
	.v-menu__content
		margin-top: 42px !important
</style>