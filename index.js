var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EnergyProvider = /** @class */ (function () {
    function EnergyProvider(startingEnergy) {
        var _this = this;
        this.energy = 0;
        this.type = 'Standard';
        this.provideEnergy = function (amountOfEnergy) {
            console.log("You requested " + amountOfEnergy + " from a " + _this.type + " type of energy source.");
            if (amountOfEnergy <= _this.energy) {
                _this.energy -= amountOfEnergy;
                return amountOfEnergy;
            }
            else {
                var returnedEnergy = _this.energy;
                _this.energy = 0;
                return returnedEnergy;
            }
        };
        this.energy = startingEnergy;
    }
    return EnergyProvider;
}());
var OilProvider = /** @class */ (function (_super) {
    __extends(OilProvider, _super);
    function OilProvider(reservoir) {
        var _this = _super.call(this, reservoir.reservoir.well.amount) || this;
        _this.type = 'Oil Reservoir';
        return _this;
    }
    return OilProvider;
}(EnergyProvider));
var AlternativeEnergyProvider = /** @class */ (function (_super) {
    __extends(AlternativeEnergyProvider, _super);
    function AlternativeEnergyProvider(alternativeEnergySource) {
        var _this = _super.call(this, alternativeEnergySource[Object.keys(alternativeEnergySource)[0]].amount) || this;
        _this.type = 'Alternative Energy';
        return _this;
    }
    return AlternativeEnergyProvider;
}(EnergyProvider));
var EnergyConsumer = /** @class */ (function () {
    function EnergyConsumer(energyProvider) {
        var _this = this;
        this.energy = 0;
        this.consumeEnergy = function (toBeConsumed) {
            var energyAvailableFromProvider = _this.provider.provideEnergy(toBeConsumed);
            _this.energy += energyAvailableFromProvider;
            if (toBeConsumed <= _this.energy) {
                _this.energy -= toBeConsumed;
                return true;
            }
            return false;
        };
        this.provider = energyProvider;
    }
    return EnergyConsumer;
}());
var Elevator = /** @class */ (function () {
    function Elevator(energyConsumer) {
        var _this = this;
        this.floor = 1;
        this.move = function (aFloor) {
            if (_this.consumer.consumeEnergy(Math.abs(_this.floor - aFloor))) {
                _this.floor = aFloor;
                console.log("Moved elevator to floor: " + aFloor);
            }
            else {
                console.log("Could not move to floor: " + aFloor);
            }
        };
        this.consumer = energyConsumer;
    }
    return Elevator;
}());
var ourEnergyProvider = new OilProvider({
    reservoir: {
        well: {
            amount: 100
        }
    }
});
//   new AlternativeEnergyProvider({
//   solar: {
//     amount: 20,
//   }
// });
var elevatorEnergyConsumer = new EnergyConsumer(ourEnergyProvider);
var firstElevator = new Elevator(elevatorEnergyConsumer);
firstElevator.move(6);
firstElevator.move(9);
firstElevator.move(21);
// We want to move to alternative energy, can you make the system work for that?
