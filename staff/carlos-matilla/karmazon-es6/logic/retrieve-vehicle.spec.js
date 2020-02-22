describe('retrieveVehicle', () => {
    it('should succeed on matching vehicle id', done => {
        const ids = ['FYF46', 'FYF93', 'FYD43', 'FYD16', 'FYC00', 'FYC05', 'FYF75', 'FYB99', 'FYC82', 'FYD62', 'FYD19', 'FYC38', 'FYC55', 'FYD18', 'FJW82', 'FYG57', 'FYD55', 'FYD65', 'FJY64', 'FJY65']

        const id = ids.random()

        retrieveVehicle(id, vehicle => {
            expect(vehicle).not.toBeInstanceOf(Error)

            expect(vehicle.id).toBe(id)
            expect(typeof vehicle.name).toBe('string')
            expect(typeof vehicle.year).toBe('number')
            // TODO ...

            done()
        })
    })

    it('should return null on non-matching vehicle id', done => {
        const id = 'non-valid-id'

        retrieveVehicle(id, vehicle => {
            expect(vehicle).not.toBeInstanceOf(Error)

            expect(vehicle).toBeNull()

            done()
        })
    })
})