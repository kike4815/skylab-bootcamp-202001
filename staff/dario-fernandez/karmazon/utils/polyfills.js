String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
} 

Array.prototype.removeValue = function(value) {
    return this.splice(this.indexOf(value), 1)
}