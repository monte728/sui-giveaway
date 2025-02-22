import * as reified from "../../_framework/reified";
import {Balance} from "../../_dependencies/onchain/0x2/balance/structs";
import {ObjectBag} from "../../_dependencies/onchain/0x2/object-bag/structs";
import {UID} from "../../_dependencies/onchain/0x2/object/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Gift =============================== */

export function isGift(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::giveaway::Gift` + '<'); }

export interface GiftFields<T0 extends PhantomTypeArgument> { id: ToField<UID>; publicKey: ToField<Vector<"u8">>; value: ToField<Balance<T0>>; creator: ToField<"address"> }

export type GiftReified<T0 extends PhantomTypeArgument> = Reified< Gift<T0>, GiftFields<T0> >;

export class Gift<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::giveaway::Gift`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Gift.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::giveaway::Gift<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Gift.$isPhantom;

 readonly id: ToField<UID>; readonly publicKey: ToField<Vector<"u8">>; readonly value: ToField<Balance<T0>>; readonly creator: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: GiftFields<T0>, ) { this.$fullTypeName = composeSuiType( Gift.$typeName, ...typeArgs ) as `${typeof PKG_V1}::giveaway::Gift<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.publicKey = fields.publicKey;; this.value = fields.value;; this.creator = fields.creator; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): GiftReified<ToPhantomTypeArgument<T0>> { return { typeName: Gift.$typeName, fullTypeName: composeSuiType( Gift.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::giveaway::Gift<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Gift.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Gift.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Gift.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Gift.fromBcs( T0, data, ), bcs: Gift.bcs, fromJSONField: (field: any) => Gift.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Gift.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Gift.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Gift.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Gift.fetch( client, T0, id, ), new: ( fields: GiftFields<ToPhantomTypeArgument<T0>>, ) => { return new Gift( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Gift.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Gift<ToPhantomTypeArgument<T0>>>> { return phantom(Gift.reified( T0 )); } static get p() { return Gift.phantom }

 static get bcs() { return bcs.struct("Gift", {

 id: UID.bcs, public_key: bcs.vector(bcs.u8()), value: Balance.bcs, creator: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Gift<ToPhantomTypeArgument<T0>> { return Gift.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), publicKey: decodeFromFields(reified.vector("u8"), fields.public_key), value: decodeFromFields(Balance.reified(typeArg), fields.value), creator: decodeFromFields("address", fields.creator) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Gift<ToPhantomTypeArgument<T0>> { if (!isGift(item.type)) { throw new Error("not a Gift type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Gift.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), publicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.public_key), value: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.value), creator: decodeFromFieldsWithTypes("address", item.fields.creator) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Gift<ToPhantomTypeArgument<T0>> { return Gift.fromFields( typeArg, Gift.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,publicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.publicKey),value: this.value.toJSONField(),creator: this.creator,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Gift<ToPhantomTypeArgument<T0>> { return Gift.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), publicKey: decodeFromJSONField(reified.vector("u8"), field.publicKey), value: decodeFromJSONField(Balance.reified(typeArg), field.value), creator: decodeFromJSONField("address", field.creator) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Gift<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Gift.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Gift.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Gift.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Gift<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGift(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Gift object`); } return Gift.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Gift<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGift(data.bcs.type)) { throw new Error(`object at is not a Gift object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Gift.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Gift.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Gift<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Gift object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGift(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Gift object`); }

 return Gift.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CreateGiftEvent =============================== */

export function isCreateGiftEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::giveaway::CreateGiftEvent` + '<'); }

export interface CreateGiftEventFields<T0 extends PhantomTypeArgument> { publicKey: ToField<Vector<"u8">>; value: ToField<"u64">; creator: ToField<"address"> }

export type CreateGiftEventReified<T0 extends PhantomTypeArgument> = Reified< CreateGiftEvent<T0>, CreateGiftEventFields<T0> >;

export class CreateGiftEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::giveaway::CreateGiftEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CreateGiftEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::giveaway::CreateGiftEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = CreateGiftEvent.$isPhantom;

 readonly publicKey: ToField<Vector<"u8">>; readonly value: ToField<"u64">; readonly creator: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: CreateGiftEventFields<T0>, ) { this.$fullTypeName = composeSuiType( CreateGiftEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::giveaway::CreateGiftEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.publicKey = fields.publicKey;; this.value = fields.value;; this.creator = fields.creator; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): CreateGiftEventReified<ToPhantomTypeArgument<T0>> { return { typeName: CreateGiftEvent.$typeName, fullTypeName: composeSuiType( CreateGiftEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::giveaway::CreateGiftEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: CreateGiftEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => CreateGiftEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CreateGiftEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => CreateGiftEvent.fromBcs( T0, data, ), bcs: CreateGiftEvent.bcs, fromJSONField: (field: any) => CreateGiftEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => CreateGiftEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => CreateGiftEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => CreateGiftEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => CreateGiftEvent.fetch( client, T0, id, ), new: ( fields: CreateGiftEventFields<ToPhantomTypeArgument<T0>>, ) => { return new CreateGiftEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CreateGiftEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<CreateGiftEvent<ToPhantomTypeArgument<T0>>>> { return phantom(CreateGiftEvent.reified( T0 )); } static get p() { return CreateGiftEvent.phantom }

 static get bcs() { return bcs.struct("CreateGiftEvent", {

 public_key: bcs.vector(bcs.u8()), value: bcs.u64(), creator: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { return CreateGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromFields(reified.vector("u8"), fields.public_key), value: decodeFromFields("u64", fields.value), creator: decodeFromFields("address", fields.creator) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { if (!isCreateGiftEvent(item.type)) { throw new Error("not a CreateGiftEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CreateGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.public_key), value: decodeFromFieldsWithTypes("u64", item.fields.value), creator: decodeFromFieldsWithTypes("address", item.fields.creator) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { return CreateGiftEvent.fromFields( typeArg, CreateGiftEvent.bcs.parse(data) ) }

 toJSONField() { return {

 publicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.publicKey),value: this.value.toString(),creator: this.creator,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { return CreateGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromJSONField(reified.vector("u8"), field.publicKey), value: decodeFromJSONField("u64", field.value), creator: decodeFromJSONField("address", field.creator) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== CreateGiftEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CreateGiftEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CreateGiftEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCreateGiftEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CreateGiftEvent object`); } return CreateGiftEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): CreateGiftEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCreateGiftEvent(data.bcs.type)) { throw new Error(`object at is not a CreateGiftEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CreateGiftEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CreateGiftEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<CreateGiftEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CreateGiftEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCreateGiftEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CreateGiftEvent object`); }

 return CreateGiftEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== WithdrawGiftEvent =============================== */

export function isWithdrawGiftEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::giveaway::WithdrawGiftEvent` + '<'); }

export interface WithdrawGiftEventFields<T0 extends PhantomTypeArgument> { publicKey: ToField<Vector<"u8">>; value: ToField<"u64">; creator: ToField<"address">; recipient: ToField<"address"> }

export type WithdrawGiftEventReified<T0 extends PhantomTypeArgument> = Reified< WithdrawGiftEvent<T0>, WithdrawGiftEventFields<T0> >;

export class WithdrawGiftEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::giveaway::WithdrawGiftEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = WithdrawGiftEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::giveaway::WithdrawGiftEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = WithdrawGiftEvent.$isPhantom;

 readonly publicKey: ToField<Vector<"u8">>; readonly value: ToField<"u64">; readonly creator: ToField<"address">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: WithdrawGiftEventFields<T0>, ) { this.$fullTypeName = composeSuiType( WithdrawGiftEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::giveaway::WithdrawGiftEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.publicKey = fields.publicKey;; this.value = fields.value;; this.creator = fields.creator;; this.recipient = fields.recipient; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): WithdrawGiftEventReified<ToPhantomTypeArgument<T0>> { return { typeName: WithdrawGiftEvent.$typeName, fullTypeName: composeSuiType( WithdrawGiftEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::giveaway::WithdrawGiftEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: WithdrawGiftEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => WithdrawGiftEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawGiftEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => WithdrawGiftEvent.fromBcs( T0, data, ), bcs: WithdrawGiftEvent.bcs, fromJSONField: (field: any) => WithdrawGiftEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => WithdrawGiftEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => WithdrawGiftEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => WithdrawGiftEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => WithdrawGiftEvent.fetch( client, T0, id, ), new: ( fields: WithdrawGiftEventFields<ToPhantomTypeArgument<T0>>, ) => { return new WithdrawGiftEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithdrawGiftEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<WithdrawGiftEvent<ToPhantomTypeArgument<T0>>>> { return phantom(WithdrawGiftEvent.reified( T0 )); } static get p() { return WithdrawGiftEvent.phantom }

 static get bcs() { return bcs.struct("WithdrawGiftEvent", {

 public_key: bcs.vector(bcs.u8()), value: bcs.u64(), creator: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { return WithdrawGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromFields(reified.vector("u8"), fields.public_key), value: decodeFromFields("u64", fields.value), creator: decodeFromFields("address", fields.creator), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { if (!isWithdrawGiftEvent(item.type)) { throw new Error("not a WithdrawGiftEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return WithdrawGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.public_key), value: decodeFromFieldsWithTypes("u64", item.fields.value), creator: decodeFromFieldsWithTypes("address", item.fields.creator), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { return WithdrawGiftEvent.fromFields( typeArg, WithdrawGiftEvent.bcs.parse(data) ) }

 toJSONField() { return {

 publicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.publicKey),value: this.value.toString(),creator: this.creator,recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { return WithdrawGiftEvent.reified( typeArg, ).new( { publicKey: decodeFromJSONField(reified.vector("u8"), field.publicKey), value: decodeFromJSONField("u64", field.value), creator: decodeFromJSONField("address", field.creator), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== WithdrawGiftEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WithdrawGiftEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return WithdrawGiftEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithdrawGiftEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithdrawGiftEvent object`); } return WithdrawGiftEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): WithdrawGiftEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWithdrawGiftEvent(data.bcs.type)) { throw new Error(`object at is not a WithdrawGiftEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return WithdrawGiftEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return WithdrawGiftEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<WithdrawGiftEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithdrawGiftEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithdrawGiftEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithdrawGiftEvent object`); }

 return WithdrawGiftEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== GiftManager =============================== */

export function isGiftManager(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::giveaway::GiftManager`; }

export interface GiftManagerFields { id: ToField<UID>; gifts: ToField<ObjectBag> }

export type GiftManagerReified = Reified< GiftManager, GiftManagerFields >;

export class GiftManager implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::giveaway::GiftManager`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GiftManager.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::giveaway::GiftManager`; readonly $typeArgs: []; readonly $isPhantom = GiftManager.$isPhantom;

 readonly id: ToField<UID>; readonly gifts: ToField<ObjectBag>

 private constructor(typeArgs: [], fields: GiftManagerFields, ) { this.$fullTypeName = composeSuiType( GiftManager.$typeName, ...typeArgs ) as `${typeof PKG_V1}::giveaway::GiftManager`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.gifts = fields.gifts; }

 static reified( ): GiftManagerReified { return { typeName: GiftManager.$typeName, fullTypeName: composeSuiType( GiftManager.$typeName, ...[] ) as `${typeof PKG_V1}::giveaway::GiftManager`, typeArgs: [ ] as [], isPhantom: GiftManager.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GiftManager.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GiftManager.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GiftManager.fromBcs( data, ), bcs: GiftManager.bcs, fromJSONField: (field: any) => GiftManager.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GiftManager.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GiftManager.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GiftManager.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GiftManager.fetch( client, id, ), new: ( fields: GiftManagerFields, ) => { return new GiftManager( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GiftManager.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GiftManager>> { return phantom(GiftManager.reified( )); } static get p() { return GiftManager.phantom() }

 static get bcs() { return bcs.struct("GiftManager", {

 id: UID.bcs, gifts: ObjectBag.bcs

}) };

 static fromFields( fields: Record<string, any> ): GiftManager { return GiftManager.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), gifts: decodeFromFields(ObjectBag.reified(), fields.gifts) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GiftManager { if (!isGiftManager(item.type)) { throw new Error("not a GiftManager type");

 }

 return GiftManager.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), gifts: decodeFromFieldsWithTypes(ObjectBag.reified(), item.fields.gifts) } ) }

 static fromBcs( data: Uint8Array ): GiftManager { return GiftManager.fromFields( GiftManager.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,gifts: this.gifts.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GiftManager { return GiftManager.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), gifts: decodeFromJSONField(ObjectBag.reified(), field.gifts) } ) }

 static fromJSON( json: Record<string, any> ): GiftManager { if (json.$typeName !== GiftManager.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GiftManager.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GiftManager { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGiftManager(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GiftManager object`); } return GiftManager.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GiftManager { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGiftManager(data.bcs.type)) { throw new Error(`object at is not a GiftManager object`); }

 return GiftManager.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GiftManager.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GiftManager> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GiftManager object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGiftManager(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GiftManager object`); }

 return GiftManager.fromSuiObjectData( res.data ); }

 }
