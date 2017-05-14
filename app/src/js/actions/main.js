export const UPDATE = "UPDATE";

export function update(value){

	return {
		type:UPDATE,
		data:value
	}
}