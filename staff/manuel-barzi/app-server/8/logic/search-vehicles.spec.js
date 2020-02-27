const { searchVehicles } = require('.')
const { fetch } = require('../utils')
require('../utils/array.prototype.random')

describe('searchVehicles', () => {
    let name, surname, username, password, token, query, ids

    const queryIds = {
        'red': ['FYC25', 'FYF21', 'FYD99', 'FYF83', 'FYD92', 'FYG53', 'FYC24', 'FYF19', 'FYD88', 'FYG71', 'GMR66', 'FYG73', 'FYF65', 'FYF29', 'FYB36', 'FYC56', 'FYB58', 'FYF36', 'FYF16', 'FYF43', 'FYG85', 'FYF40', 'FYF85', 'FYD89', 'FYF71', 'FYF34', 'FYG68', 'FYC21', 'FYC66', 'FYC97', 'FYG12', 'FYG69', 'FYG70', 'GBT61', 'GGR60', 'FYD83', 'FYC61', 'FYD78', 'FYG15', 'FYD73', 'FYF03', 'FYD45', 'GBT30', 'GBT88', 'GBT31', 'FYJ56', 'FYG44', 'FYG32', 'FYD80', 'FYC46', 'FYF99', 'FYB43', 'FYB34', 'FYF12', 'FYF38', 'FYB72', 'FYG65', 'FYG66', 'FYG67', 'FYD48', 'FYF44', 'FYC42', 'FYD30', 'FYD00', 'FYD07', 'FYF78', 'FYC89', 'FYD35', 'FYD09', 'FYB79', 'FYC30', 'FYB54', 'FYC78', 'FYB63', 'FYD29', 'FYB96', 'FYC86', 'FYC98', 'FYD05', 'FYD14', 'FYC60', 'FYB70', 'FYG62', 'FYG63', 'FYG64', 'FYD61', 'FJV66', 'GFB79', 'FYC39', 'FYB57', 'FYC70', 'FYB55', 'FYD33', 'FYD17', 'FYD58', 'FYC92', 'FJW04', 'FJY26', 'FJW75', 'FKB20', 'FJY67', 'FJY73', 'FKB45', 'FJW32', 'FKB11', 'FKC24', 'FKC23', 'FKC25', 'FJY70', 'FJY16', 'FKB15', 'FJV97', 'FKB01', 'FJW42', 'FJY17', 'FKB50', 'FJY07', 'FJV79', 'FJY13', 'FKB37', 'FJW00', 'FRR82', 'FRR85', 'FRR88', 'FRR91', 'FRR94', 'FJV61', 'FKB95', 'FJW96', 'FJY24', 'FJW88', 'FJY42', 'FKC22', 'FKC21', 'FJY02', 'FKB35', 'FJX44', 'FJY83', 'FKB07', 'FJV77', 'FRR81', 'FRR84', 'FRR87', 'FRR90', 'FRR93', 'FJW83', 'FJV83', 'FJY36', 'FJY11', 'FDK41', 'FJV56', 'FJX11', 'FJW28', 'FJX79', 'FKC17', 'FKC18', 'FKC19', 'FJX12', 'FJV50', 'FTX87', 'FJX23', 'FJY95', 'FJX09', 'FRR80', 'FRR86', 'FRR89', 'FRR92', 'FJW67', 'FJX24', 'FKB32', 'FJW48', 'FJW52', 'FJV59', 'FJX99', 'FJW63', 'FJW54', 'FJV47', 'FJX95', 'FJW19', 'FJV74', 'FKC14', 'FKC15', 'FKC16', 'FJX40', 'FJW13', 'FJW37', 'FKB99', 'FJV82', 'FJW51', 'FJV44', 'FJX50', 'FJX51', 'FJX52', 'FJX53', 'FJX54', 'FJW58', 'FJX91', 'DVC30', 'DVC24', 'DVC53', 'DTY36', 'DVC18', 'DVB02', 'DTY13', 'DVC48', 'DTY12', 'DTY99', 'DVC29', 'DTX17', 'DVC07', 'DVC17', 'DTX00', 'DTY60', 'DTY33', 'DVB68', 'DVC00', 'DVC52', 'DTY88', 'DVB03', 'DTY08', 'DTX22', 'DVB21', 'DTY58', 'DTY59', 'DTW80', 'DVB41', 'DTY56', 'DVC27', 'DTY31', 'DVB91', 'DVB18', 'DVB19', 'DTY87', 'DVC19', 'DVC01', 'DVB58', 'DTY68', 'DTY64', 'DVB10', 'DTX16', 'DTY06', 'DVC26', 'DVB90', 'DVB17', 'DTY92', 'DVB26', 'DVB65', 'DTX84', 'DVB88', 'DTX05', 'DVB37', 'DVB72', 'DTX21', 'DVB15', 'DTX30', 'DVB39', 'DTY63', 'DTX31', 'DVC21', 'DTX09', 'DTX44', 'DVB84', 'DTY57', 'DTY62', 'DTX74', 'DTY24', 'DTY03', 'DTX23', 'DTX91', 'DTX11', 'DTW93', 'DTX63', 'DTX93', 'DTX20', 'DTX68', 'DTX97', 'DTX59', 'DTX47', 'DTW81', 'DTX89', 'DTX80', 'DTX72', 'DTX77', 'DJM19', 'DJJ47', 'DRM16', 'DHR81', 'DHR83', 'DHT33', 'DHX13', 'DHX64', 'DHX65', 'DHR86', 'DHX67', 'DHR91', 'DHX70', 'DHR70', 'DHP23', 'DHP24', 'DHR30', 'DHX52', 'DHR62', 'DHR63', 'DHR64', 'DHR65', 'DHW96', 'DHW97', 'DHP22', 'DHR54', 'DHR55', 'DHX49', 'DHX50', 'DHY12', 'DHR56', 'DHP20', 'DHW90', 'DHW91', 'DHP21', 'DHP53', 'DHX17', 'DHX18', 'DHP57', 'DHR03', 'DHP00', 'DHR08', 'DHR12', 'DHT91', 'DHR13', 'DHT19', 'DHT25', 'DHP35', 'DHP72', 'DHW66', 'DHN97', 'DHP76', 'DHP77', 'DHP78', 'DHT90', 'DHT28', 'DHX47', 'DHP18', 'DHP83', 'DHP88', 'DHR38', 'DHR39', 'DHP16', 'DHW82', 'DHW77', 'DHX72', 'DHT05', 'DHX08', 'DHT08', 'DHW75', 'DHT14', 'DHR26', 'DHR28', 'DHP08', 'DHP10', 'DHR60', 'DHW94', 'DHR74', 'DHP97', 'DHP52', 'DHY09', 'DHR36', 'DHX39', 'DHX40', 'DHP15', 'DHP63', 'DHR04', 'DHR05', 'DHX25', 'DHP05', 'DHR42', 'DHR45', 'DHR94', 'DHR97', 'DHX07', 'DHR16', 'DHX31', 'DHX21', 'DHP43'],
        'green': ['FYG51', 'FYD40', 'FYF88', 'FYB45', 'FYD88', 'FYG08', 'FYF37', 'FYD95', 'FYC23', 'FYC48', 'FYC56', 'FYF11', 'FYD81', 'FYD93', 'FYF64', 'FYC08', 'FYD86', 'FYB52', 'FYF24', 'FKB94', 'FYF53', 'FYD84', 'FYB51', 'FYD46', 'GBT50', 'GBT83', 'GBT35', 'FYF55', 'GBT39', 'GBT40', 'GBT42', 'GBT45', 'GBT47', 'FYD82', 'FYG19', 'FYB50', 'FYF06', 'FYD59', 'FYC37', 'FYC83', 'FYD98', 'FYF42', 'FYC91', 'FYB76', 'FYD15', 'FYC07', 'FYG77', 'FJX08', 'FYB60', 'FYD24', 'FYB77', 'FYB64', 'FJY98', 'FYB95', 'FYC59', 'FYC52', 'FYD66', 'FYC40', 'FYG00', 'FYD28', 'FJY63', 'FKB51', 'FJY08', 'FKB18', 'FJW70', 'FJY50', 'FJY85', 'FJY01', 'FYJ52', 'FKB34', 'FRR82', 'FKB52', 'FJY25', 'FJV73', 'FJX14', 'FKC09', 'FRR87', 'FJW23', 'FJY56', 'FJX73', 'FJY46', 'FJY55', 'FTX88', 'FKC01', 'FJY97', 'FJW93', 'FRR92', 'FJW68', 'FJX41', 'FJW20', 'FJW24', 'FJX78', 'FJW16', 'FJX80', 'FJX20', 'FKB40', 'FJW47', 'FKC00', 'FKB26', 'FJX53', 'FJX84', 'FJW57', 'FJW05', 'DTY34', 'DVB64', 'DVC40', 'DVC28', 'DTY60', 'DTY95', 'DTY10', 'DVC34', 'DTY74', 'DTX24', 'DTY41', 'DTY38', 'DVB67', 'DVB40', 'DTY07', 'DTX40', 'DVB89', 'DVC23', 'DVB09', 'DVB80', 'DVB66', 'DVB14', 'DVB16', 'DTX13', 'DTY80', 'DTY48', 'DTY70', 'DTY27', 'DTX29', 'DTX50', 'DTX82', 'DTY25', 'DTY01', 'DTY39', 'DTX34', 'DTX36', 'DTW95', 'DJM21', 'BDM54', 'DJJ50', 'DHT35', 'DHR85', 'DHR93', 'DHR67', 'DHP94', 'DHX49', 'DHY12', 'DHP21', 'DHP55', 'DHP58', 'DHW55', 'DHR09', 'DHX29', 'DHT27', 'DHW65', 'DHP74', 'DHW71', 'DHT90', 'DHT28', 'DHT29', 'DHX79', 'DHX97', 'DHX46', 'DHT30', 'DHT31', 'DHP36', 'DHX11', 'DHR52', 'DHW89', 'DHP82', 'DHP87', 'DHP88', 'DHX84', 'DHX54', 'DHT06', 'DHX10', 'DHW95', 'DHR73', 'DHT20', 'DHX98', 'DHR35', 'DHT83', 'DHW54', 'DHX23', 'DHW84', 'DHR96', 'DHR98', 'DHY06', 'DHR20', 'DHY10', 'DHR25', 'DHP44', 'DHT95'],
        'blue': ['FYB61', 'FYF94', 'FYG51', 'FYF09', 'FYF23', 'FYG09', 'FYC73', 'FYF66', 'FYB39', 'FYG08', 'FYC54', 'FYF68', 'FYC27', 'FYB49', 'FYC48', 'FYB62', 'FYC76', 'FYC11', 'FYB48', 'FYB41', 'FYF81', 'FYD42', 'FYF61', 'FYC72', 'FYG84', 'GGR59', 'GBT34', 'GBT52', 'GBT51', 'GBT36', 'FYG34', 'FYC28', 'FYC34', 'FYF07', 'FYB75', 'FYC74', 'FYC75', 'FYC77', 'FYB66', 'FYC14', 'GBT29', 'GBT43', 'GBT78', 'FYJ47', 'FYD75', 'FYG59', 'FYF99', 'FYG87', 'FYB67', 'FYD94', 'FYB46', 'FYC65', 'FYG17', 'FYF89', 'FYF05', 'FYC19', 'FYF76', 'FYB91', 'FYB35', 'FYC63', 'FYC53', 'FYD10', 'FYG13', 'FYF32', 'FYF91', 'FYB33', 'FYF08', 'FYD26', 'FYD72', 'FYD56', 'FYD32', 'FYC15', 'FYD63', 'FYB44', 'FYC57', 'FYD21', 'FYD22', 'FYC88', 'FYD12', 'FYC03', 'FYC60', 'FYC68', 'FYD02', 'FYD60', 'FYD69', 'FJW09', 'FYB97', 'FYF92', 'FYC45', 'FYD41', 'FYC99', 'FYB78', 'FYB94', 'FWG03', 'FYB32', 'FYC41', 'FYC29', 'FYC69', 'FYB74', 'FJY87', 'FKB44', 'FJW02', 'FKC08', 'FKC07', 'FJY47', 'FJX45', 'FJY60', 'FKB16', 'FKB53', 'FJX48', 'FJW03', 'FJX30', 'FJW31', 'FKB33', 'FTT37', 'FJV48', 'FJV81', 'FYJ45', 'FJX47', 'FJX49', 'FJW72', 'FJY59', 'FJY74', 'FJX16', 'FJX19', 'FJX46', 'FJV92', 'FJY81', 'FJY33', 'FKB10', 'FJY18', 'FLJ06', 'FJY86', 'FRR84', 'FJY62', 'FJY10', 'FKB08', 'FJV78', 'FJY51', 'FKB17', 'FJX26', 'FKB19', 'FJV53', 'FJW65', 'FJY32', 'FJY39', 'FJY14', 'FJY96', 'FJX37', 'FTX86', 'FJV75', 'FJX25', 'FKB23', 'FJV93', 'FJX88', 'FRR80', 'FJY04', 'FJW56', 'FJW25', 'FJX77', 'FJW12', 'FJX85', 'FJW46', 'FKB47', 'FJW50', 'FJV90', 'FJW43', 'FJX65', 'FJX71', 'FJX32', 'FJW14', 'FJV42', 'FJX72', 'FJX36', 'FKB97', 'FJV51', 'FJW90', 'FKB29', 'FJV40', 'FJX52', 'FJW06', 'FJX05', 'FJX64', 'DVC44', 'DVC32', 'DVC24', 'DTY66', 'DVC09', 'DVC14', 'DVB96', 'DVC08', 'DTX62', 'DTW90', 'DVB01', 'DTX27', 'DTX15', 'DTY67', 'DVC25', 'DVC37', 'DVB34', 'DVB93', 'DTY11', 'DTW86', 'DVC51', 'DTY65', 'DTY53', 'FBD29', 'DTY98', 'DTX26', 'DVB13', 'DTX83', 'DTY52', 'DTY14', 'DTY56', 'DVB76', 'DTX06', 'DTY69', 'DVC11', 'DVC05', 'DTY47', 'DTY94', 'DTY61', 'DTX25', 'DTY93', 'DVC26', 'DVB20', 'DTX28', 'DTW92', 'DVB63', 'DVB57', 'DVB81', 'DTX12', 'DVC22', 'DVB28', 'DVB72', 'DTY28', 'DVB35', 'DTX18', 'DVB42', 'DVB79', 'DTX95', 'DVB74', 'DTY23', 'DTY75', 'DTY57', 'DTX61', 'DTX14', 'DTX07', 'DTX57', 'DTX67', 'DTX46', 'DTY00', 'DTX41', 'DTX88', 'DTX76', 'DTY30', 'DTY82', 'DTY55', 'DTX94', 'DTY04', 'DTY79', 'DHT88', 'DHX78', 'DHX61', 'DHR82', 'DHT86', 'DHT34', 'DHX02', 'DHR92', 'DHT87', 'DHR66', 'DHW99', 'DHR71', 'DHX00', 'DHR62', 'DHR64', 'DHR65', 'DHW97', 'DHR55', 'DHX50', 'DHW90', 'DHN93', 'DHX16', 'DHP56', 'DHP95', 'DHP28', 'DHT79', 'DHR02', 'DHR11', 'DHR15', 'DHT23', 'DHT24', 'DHT26', 'DHT89', 'DHP73', 'DHW69', 'DHW70', 'DHP79', 'DHT29', 'DHT30', 'DHR47', 'DHR48', 'DHX45', 'DHT84', 'DHW88', 'DHP19', 'DHR41', 'DHP37', 'DHP38', 'DHP39', 'DHP40', 'DHP41', 'DHT77', 'DHP42', 'DHN87', 'DHN88', 'DHN89', 'DHP03', 'DHX71', 'DHX09', 'DHT10', 'DHP91', 'DHT11', 'DHT82', 'DHW78', 'DHW79', 'DHR57', 'DHX33', 'DHR59', 'DHT85', 'DHR77', 'DHR78', 'DHR27', 'DHP27', 'DHR34', 'DHP13', 'DHP14', 'DHP04', 'DHP07', 'DHR46', 'DHX03', 'DHP30', 'DHP31', 'DHR18', 'DHT81', 'DHR19', 'DHN99', 'DHR24', 'DHT93', 'DHP46', 'DHW49', 'DHP51', 'DHN91']
    }

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()

        query = Object.keys(queryIds).random()
        ids = queryIds[query]
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            })
                .then(response => {
                    if (response.content) {
                        const { error } = JSON.parse(response.content)

                        if (error) throw new Error(error)
                    }

                    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    })
                })
                .then(response => {
                    const { error: _error, token: _token } = JSON.parse(response.content)

                    if (_error) throw new Error(_error)

                    token = _token
                })
        )

        it('should get results on matching query but no favs if not previously added', () =>
            searchVehicles(token, query)
                .then(vehicles => {
                    expect(vehicles).toBeDefined()
                    expect(vehicles.length).toBeGreaterThan(0)

                    vehicles.forEach(vehicle => {
                        expect(typeof vehicle.id).toBe('string')
                        expect(typeof vehicle.name).toBe('string')
                        expect(typeof vehicle.thumbnail).toBe('string')
                        expect(typeof vehicle.price).toBe('number')
                        expect(typeof vehicle.isFav).toBe('boolean')
                        expect(vehicle.isFav).toBeFalsy()
                    })
                })
        )

        it('should succeed on non-matching query returning an empty array', () =>
            searchVehicles(token, 'asdasdfñlajsfklasldñkfjañlsjflasjflasjfñladjs')
                .then(results => {
                    expect(results).toBeDefined()
                    expect(results).toHaveLength(0)
                })
        )

        describe('when fav vehicles already exists', () => {
            beforeEach(() => {
                const favs = [ids.random(), ids.random(), ids.random()]

                return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ favs })
                })
                    .then(response => {
                        if (response.content) {
                            const { error } = JSON.parse(response.content)

                            if (error) throw new Error(error)
                        }
                    })
            })

            it('should get results on matching query with favs as previously added', () =>
                searchVehicles(token, query)
                    .then(vehicles => {
                        expect(vehicles).toBeDefined()
                        expect(vehicles.length).toBeGreaterThan(0)

                        return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then(response => {
                                // retrieve user to check fav has been removed

                                const user = JSON.parse(response.content), { error: _error } = user

                                if (_error) throw new Error(_error)

                                const { favs } = user

                                for (const fav of favs)
                                    expect(ids).toContain(fav)

                                vehicles.forEach(vehicle => {
                                    expect(typeof vehicle.id).toBe('string')
                                    expect(typeof vehicle.name).toBe('string')
                                    expect(typeof vehicle.thumbnail).toBe('string')
                                    expect(typeof vehicle.price).toBe('number')
                                    expect(typeof vehicle.isFav).toBe('boolean')

                                    expect(vehicle.isFav).toBe(favs.includes(vehicle.id))
                                })
                            })
                    })
            )
        })

        it('should fail on invalid token', () =>
            searchVehicles(`${token}-wrong`, query)
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('invalid token')
                })
        )

        afterEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            })
                .then(response => {
                    if (response.content) {
                        const { error } = JSON.parse(response.content)

                        if (error) throw new Error(error)
                    }
                })
        )
    })

    it('should fail on non-string query', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'

        expect(() =>
            searchVehicles(token, undefined)
        ).toThrowError(TypeError, 'undefined is not a string')

        expect(() =>
            searchVehicles(token, 1)
        ).toThrowError(TypeError, '1 is not a string')

        expect(() =>
            searchVehicles(token, true)
        ).toThrowError(TypeError, 'true is not a string')

        expect(() =>
            searchVehicles(token, {})
        ).toThrowError(TypeError, '[object Object] is not a string')
    })

    // TODO unit test cases for anonymous searches
})