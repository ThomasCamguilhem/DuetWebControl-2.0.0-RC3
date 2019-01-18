<template>
	<v-layout row wrap>
		<v-flex xs12 sm8 md8 lg9 xl9>
			<v-layout column>
				<v-flex>
					<movement-panel></movement-panel>
				</v-flex>

				<v-flex>
					<v-layout row>
						<v-flex sm12 md9 lg9 xl10>
							<extrude-panel></extrude-panel>
						</v-flex>

						<v-flex class="hidden-sm-and-down" align-self-center md3 lg3 xl2>
							<atx-panel></atx-panel>
						</v-flex>
					</v-layout>
				</v-flex>

				<v-flex v-if="!isLocal">
					<gcode-panel></gcode-panel>
				</v-flex>

				<v-flex md9 v-if="!isLocal">
					<fan-panel></fan-panel>
				</v-flex>

				<v-flex class="hidden-md-and-up">
					<atx-panel></atx-panel>
				</v-flex>
			</v-layout>
		</v-flex>

		<v-flex sm4 md4 lg3 xl3>
			<macro-list></macro-list>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
			isLocal: (location.hostname === 'localhost') || (location.hostname === '127.0.0.1') || (location.hostname === '[::1]')
		}
	},
	methods:{
	}
}
</script>
