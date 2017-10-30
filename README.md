
# Jarhead Printer

The Jarhead Printer is a 3D printer / CNC that is built to endure
heavy environments and still allowing maximum print precision and
quality.

It is originally derived from several other designs, such as the
Prusa i3, Anet AM8, OpenBuilds' Printbot and other printers. You
can see it as the evil cross-breed that tries to use advantages
of all other designs while trying to keep its design as simple
(and interchangeable) as possible.

However, the main focus of this printer is to being "built to endure"
so its design and its parts follow the KISS principle and still try
to allow flexible modifications and scaling of X/Y/Z print volume
dimensions.


## Features Overview

- 3D Printer for ABS, PLA, PETG
- CNC for Aluminium, Wood and Plastics
- Very sturdy, bubble-leveled frame
- X-Cart designed for replaceable tools
- Y-Cart designed for replaceable beds
- Interchangeable, simple part design
- Compatible with E3D V6 Bowden Extruder
- Cork- and Fiberglass-insulated heatbed


# Preview Pictures

![preview](./preview/preview.png)


## Print Settings

Print Settings:

```
material:             PLA (or ABS)
layer height:         0.2mm
wall thickness:       0.8mm
top/bottom thickness: 0.8mm
infill density:       80%
infill pattern:       tetrahedral
```

**ABS**:

If you want to use the 3D printer as an ABS and PETG printer,
it is recommended to print the `tools` parts with ABS so that
those can withstand higher temperatures.


# Bill of Materials / Print Checklist

As the Jarhead Printer is a configurable printer that is flexible
in its design, dimensions, tools and parts - there is a web app
available that helps you choose what you want:

[Jarhead Configurator](https://rawgit.com/cookiengineer/jarhead-printer/master/configurator/index.html)

If you want to make the defaulted printer, you can still follow
the oldschool [BOM.md](./BOM.md). Note that the printer is RAMPS
compatible, so a standard RAMPS Kit and Hotbed are implied when
building for an E3D V6 Hotend.


# Work in Progress

- Extruder Motor Design
- Mainboard Mount Design
- Power Supply Mount Design
- Firmware (probably a Marlin fork)


# FAQ

- How's the name "Jarhead" related to this?
  1. It looks like a jar.
  2. It tries to achieve military precision.
  3. It has replaceable heads.
  4. ...
  5. I guess you get it now.

