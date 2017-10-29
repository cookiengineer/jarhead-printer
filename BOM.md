
# Bill of Materials

## Printable Parts

**Frame**:

- [1x Z Endstop](./design/frame/1xZ_Endstop.stl)
- [1x Z Motor Mount Left](./design/frame/1xZ_Motor_Mount_Left.stl)
- [1x Z Motor Mount Right](./design/frame/1xZ_Motor_Mount_Right.stl)
- [1x Z Rod Holder Left](./design/frame/1xZ_Rod_Holder_Left.stl)
- [1x Z Rod Holder Right](./design/frame/1xZ_Rod_Holder_Right.stl)
- [2x Bottom Tee Plate](./design/frame/2xBottom_Tee_Plate.stl)
- [2x Side Tee Corner](./design/frame/2xSide_Tee_Corner.stl)
- [2x Top Corner Plate](./design/frame/2xTop_Corner_Plate.stl)
- [8x Bottom Corner Plate](./design/frame/8xBottom_Corner_Plate.stl)

**X-Carriage**:

The default X-Cart matches the specifications for Openbuilds Delrin Mini V Wheels.
The X-Left and X-Right parts must be mirrored (along the X-axis) to be used on the other side.

- [1x X-Cart](./design/x-carriage/1xX-Cart.stl) or alternatively [1x X-Cart for 605ZZ Wheels](./design/x-carriage/1xX-Cart_for_605ZZ_Wheels.stl)
- [1x X-Left with Motor Mount](./design/x-carriage/1xX-Left_with_Motor_Mount.stl)
- [1x X-Right with Belt Puller](./design/x-carriage/1xX-Right_with_Belt_Puller.stl)

**Y-Carriage**:

The default Y-Cart matches the specifications for Openbuilds Delrin Mini V Wheels.
The Y-Top and Y-Bottom parts can be used on both sides.

- [1x Y-Cart](./design/y-carriage/1xY-Cart.stl) or alternatively [1x Y-Cart for 605ZZ Wheels](./design/y-carriage/1xY-Cart_for_605ZZ_Wheels.stl)
- [1x Y-Front with Belt Puller](./design/y-carriage/1xY-Front_with_Belt_Puller.stl)
- [1x Y-Rear with Motor Mount](./design/y-carriage/1xY-Rear_with_Motor_Mount.stl)

**Tools**:

The default E3D Tool Plate has no belt grip. If the part is printed on a 3D printer with
very good precision, it is recommended to print the variant with a Belt Grip.

- [1x E3D Tool Cap](./design/tools/1xE3D_Tool_Cap.stl)
- [1x E3D Tool Plate](./design/tools/1xE3D_Tool_Plate.stl) or alternatively [1x E3D Tool Plate with Belt Grip](./design/tools/1xE3D_Tool_Plate_with_Belt_Grip.stl)

**Other Parts**:

The default Belt Tensioner matches the specifications for Openbuilds Pulley Idler Wheel.

- [2x Belt Tensioner](./design/tensioner/2xBelt_Tensioner.stl)
- [2x Belt Tensioner Knob](./design/tensioner/2xBelt_Tensioner_Knob.stl)
- [2x GT20 Idler](./design/parts/2xGT20_Idler.stl)
- [2x GT20 Pulley](./design/parts/2xGT20_Pulley.stl)
- [8x 605ZZ Wheel](./design/parts/8x605ZZ_Wheel.stl)
- [M5 T-Slot Nut](./design/parts/M5_T-Slot_Nut.stl)


## Bill of Materials

**Frame Parts**

The printer frame is built with `2040` extrusions while the
X-Axis (that moves the extruder) and Y-Axis (that moves the heatbed)
use `2020` extrusions.

Every frame dimension is freely scaleable, as all printable parts
are prepared for that use case. Please use the [calculator](https://rawgit.com/cookiengineer/jarhead-printer/master/calculator/index.html)
that is included in this repository.

| Amount | Description                         | Length | Usage                             |
|--------|-------------------------------------|--------|-----------------------------------|
| 1x     | 2020 Aluminium Profile B-Type Nut 6 | 425mm  | X-Axis                            |
| 1x     | 2020 Aluminium Profile B-Type Nut 6 | 380mm  | Y-Axis                            |
| 2x     | 2040 Aluminium Profile B-Type Nut 6 | 440mm  | Z-Frame (Left and Right)          |
| 2x     | 2040 Aluminium Profile B-Type Nut 6 | 340mm  | Y-Frame (Left and Right)          |
| 3x     | 2040 Aluminium Profile B-Type Nut 6 | 310mm  | X-Frame (Front, Rear and Middle ) |
| 2x     | 8mm Rod                             | 360mm  | Z-Axis                            |
| 2x     | 8mm Threaded Rod                    | 355mm  | Z-Axis                            |

**Electronics**

| Amount | Description                            |
|--------|----------------------------------------|
| 1x     | E3D V6 Hotend                          |
| 1x     | Hotbed MK2B 200mm x 200mm              |
| 1x     | RAMPS Kit with 5 motor drivers and LCD |
| 5x     | NEMA17 Stepper Motor                   |

If you want to use a different Hotbed size, adjust the X and Y dimension
for the frame parts accordingly.

**Mechanical Parts**

| Amount | Description                         | Usage                                         |
|--------|-------------------------------------|-----------------------------------------------|
|     2x | ABEC-5 608ZZ Bearing                | Threaded Rods to Z-Rod Holder                 |
|    16x | ABEC-5 605ZZ Bearing                | X-Cart Wheels, Y-Cart Wheels                  |
|     2x | LM8UU Bearing                       | X-Left and X-Right to Z-Rods                  |
|    16x | M3x20mm Bolt                        | Stepper Motors                                |
|     8x | M5 Nut                              | Tool Plate, X-Cart, Y-Cart, Tensioners        |
|     6x | M5 Washer                           | X-Cart Wheels, Y-Cart Wheels, Tensioners      |
|    10x | M5 self-locking Nut                 | X-Cart Wheels, Y-Cart Wheels                  |
|    92x | M5 T-Slot Nut                       | Frame                                         |
|    92x | M5x10mm Bolt                        | Frame                                         |
|     4x | M5x16mm Bolt                        | X-Cart to Tool Plate, Y-Cart to Heatbed Plate |
|    14x | M5x30mm Bolt                        | X-Cart Wheels, Y-Cart Wheels, Tool Plate      |
|     4x | M6x20mm Bolt                        | Z-Frame to Bottom Tee Plate                   |
|     2x | M8 Nut                              | Threaded Rods to X-Left and X-Right           |
|     8x | Openbuilds Delrin Mini-V Wheel      | X-Cart Wheels, Y-Cart Wheels                  |
|     2x | 5x8mm Aluminium Z-Coupler           | Stepper Motors to Z-Rods                      |

The default X-Cart and Y-Cart design is compatible with the Openbuilds Delrin
Mini V Wheels and if those are used the 605ZZ bearings are not required.

