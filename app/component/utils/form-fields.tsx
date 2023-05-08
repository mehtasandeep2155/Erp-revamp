import {
	InputLabel,
	TextField,
	Autocomplete,
	Box,
	MenuItem,
	Chip,
	Select,
	FormControlLabel,
	Checkbox
} from "@mui/material";
import { ErrorMessage } from "formik";
import {
	formGroup,
	formControl,
	errText,
	loginBtn,
	labelStyles,
	productListDiv,
	productLisSelecttDiv,
	requireStyle,
	close,
	addProductCard,
	addProductCardDiv,
	addProductCardIcon,
	optionProduct,
	menuItmeStyle,
	varianthead,
	formColorControl,
	variantDetailsProduct,
	checkSearchDiv,
	inputError
} from "@css/styles";
import { btnDiv } from "@component/auth/login/styles";
import { Add, Cancel, ExpandMore, Search } from "@mui/icons-material";
import TableDetailsComponent from "@common/tables/details-table";
import { useState } from "react";
import useConstant from "./form/constant";
import { IconButtons } from "@common/buttons";
import { doneBtnStyles } from "@css/mui-styles";
import { lightGrey, pelorous } from "@css/color-palette";

export const Input = ({
	placeholder,
	name,
	onChange,
	label,
	valueProps,
	require,
	error,
	disabled,
	value,
	uid,
	id,
	type,
	icon,
	uom
}: any) => {
	return (
		<>
			<div className={formGroup}>
				{label && (
					<InputLabel className={`${labelStyles}`}>
						{label}
						{require && <span className={requireStyle}>*</span>}
					</InputLabel>
				)}
				<input
					className={
						valueProps.touched[name] && valueProps.errors[name]
							? inputError
							: name !== "color"
							? formControl
							: formColorControl
					}
					disabled={disabled}
					value={value}
					placeholder={placeholder}
					name={name}
					defaultValue={value}
					type={type ? type : "text"}
					onChange={(e) => onChange(e, valueProps, id, uid)}
				/>
				{uom ? uom : null}
				{icon ? icon : null}
			</div>
			{error && <ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>}
		</>
	);
};

export const Button = (props: any) => {
	const { button } = props;
	return (
		<div className={btnDiv}>
			<button className={loginBtn} type="submit">
				{button}
			</button>
		</div>
	);
};

export const MultiCompanySelectInput = (props: any) => {
	const { onChange, options, label, valueProps, error, name, itemName, uid, require, placeholder, id, handleDelete } =
		props;
	const [isOpen, setIsOpen] = useState(false);
	const [searchvalue, setSearchvalue] = useState("");

	const getSelected = (array1: any, array2: any) => {
		return JSON.stringify(array2) === JSON.stringify(array1);
	};

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Select
				size="small"
				fullWidth
				id="demo-multiple-chip"
				name={name}
				sx={{ color: itemName?.length == 0 && lightGrey }}
				value={itemName}
				open={isOpen}
				IconComponent={() => (
					<ExpandMore
						sx={{ position: "absolute", right: "12px", color: "black", cursor: "pointer" }}
						onClick={() => setIsOpen(!isOpen)}
					/>
				)}
				displayEmpty
				renderValue={
					itemName?.length == 0
						? () => placeholder
						: !isOpen
						? () => (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									{itemName?.map((value: any) => (
										<Chip
											key={value}
											label={value.name ? value.name : value.color}
											deleteIcon={
												<Cancel
													className={close}
													onMouseDown={(event) => event.stopPropagation()}
												/>
											}
											onDelete={() =>
												handleDelete(value, name, value.id, valueProps.setFieldValue)
											}
										/>
									))}
								</Box>
						  )
						: () => placeholder
				}
			>
				<MenuItem key={name}>
					<input
						value={searchvalue}
						className={formColorControl}
						placeholder={"Search"}
						onChange={(event) => setSearchvalue(event.target.value)}
					/>
					<div className={checkSearchDiv}>
						<Search />
					</div>
				</MenuItem>
				{options.map((item: any) => {
					// if (item.name.toLowerCase().includes(searchvalue.toLowerCase())) {
					return (
						<MenuItem key={name}>
							<FormControlLabel
								onChange={(e) =>
									onChange(
										{
											target: {
												name: name,
												value: item ? options.map((item: any) => item) : "",
												checked: e.target.checked
											}
										},
										valueProps,
										id,
										uid
									)
								}
								name={name}
								control={
									<Checkbox
										sx={{
											color: pelorous,
											"&.Mui-checked": {
												color: pelorous
											}
										}}
									/>
								}
								sx={{ fontSize: "5px" }}
								label={item.name ? item.name : item}
								checked={itemName.map((item1: any) => item1.name).includes(item.name)}
							/>
						</MenuItem>
					);
				})}
				<MenuItem key={name}>
					<FormControlLabel
						name={name}
						onChange={(e) =>
							onChange(
								{
									target: {
										name: name,
										value: e.target.checked ? options.map((item: any) => item) : "",
										checked: e.target.checked
									}
								},
								valueProps,
								id,
								uid
							)
						}
						control={
							<Checkbox
								sx={{
									color: pelorous,
									"&.Mui-checked": {
										color: pelorous
									}
								}}
							/>
						}
						sx={{ fontSize: "5px" }}
						checked={getSelected(
							itemName.map((item1: any) => item1.name),
							options.map((item1: any) => item1.name)
						)}
						label="Select All"
					/>
				</MenuItem>
				<MenuItem key={name}>
					<IconButtons
						styles={doneBtnStyles}
						clickEvent={() => {
							setIsOpen(!isOpen);
						}}
						lebel={<h6>Done</h6>}
					/>
				</MenuItem>
			</Select>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const MultiStockInput = (props: any) => {
	const {
		onChange,
		options,
		label,
		valueProps,
		error,
		name,
		itemName,
		uid,
		placeholder,
		require,
		id,
		handleDelete,
		index
	} = props;

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Select
				size="small"
				fullWidth
				id="demo-multiple-chip"
				name={name}
				sx={{ color: itemName?.length == 0 && lightGrey }}
				value={itemName}
				displayEmpty
				onChange={(e) => onChange(e, valueProps, id, uid)}
				renderValue={
					itemName?.length == 0
						? () => placeholder
						: () => (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									{itemName?.map((value: any) => (
										<Chip
											key={value}
											label={value.name}
											deleteIcon={
												<Cancel
													className={close}
													onMouseDown={(event) => event.stopPropagation()}
												/>
											}
											onDelete={() => handleDelete(value, index, itemName)}
										/>
									))}
								</Box>
						  )
				}
			>
				{options.map((name: any) => (
					<MenuItem key={name} value={name}>
						{name.name ? name.name : name}
					</MenuItem>
				))}
			</Select>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const ProductMultiSelectInput = (props: any) => {
	const { label, placeholder, button, error, productDetailsList, productClick, tableDataSelect } = props;
	const { productViewColums } = useConstant();
	return (
		<div className={`${formGroup}`}>
			<b className={varianthead}>{label}:-</b>
			<div className={variantDetailsProduct}>
				{productDetailsList?.length > 0 && tableDataSelect?.length > 0 ? (
					<div className={productListDiv}>
						<TableDetailsComponent
							title="Product Rate List"
							columns={productViewColums}
							tableData={tableDataSelect}
							loading={false}
							pagination={false}
						/>
					</div>
				) : (
					<div className={addProductCard}>
						<div className={addProductCardDiv} onClick={() => productClick(placeholder, "open", "")}>
							<Add className={addProductCardIcon} />
						</div>
					</div>
				)}
			</div>
			{button && productDetailsList?.length !== 0 && tableDataSelect?.length !== 0 && button}
			{error && <div className={errText}>{error}</div>}
		</div>
	);
};

export const MultiSelectInput = (props: any) => {
	const {
		options,
		label,
		name,
		placeholder,
		button,
		error,
		columdata,
		value,
		colums,
		valueProps,
		disabled,
		handleOnClick
	} = props;

	const [inputvalue, setInputValue] = useState("");
	const [showOption, setShowOption] = useState(false);

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Autocomplete
				id="combo-box-demo"
				forcePopupIcon={false}
				aria-label="outlined"
				options={columdata}
				value={value}
				onPointerEnter={() => setShowOption(true)}
				getOptionLabel={(option) => (option?.name ? option.name : value)}
				renderOption={(option: any) =>
					options.length > 0 ? (
						showOption ? (
							option["data-option-index"] === 0 && (
								<div className={productLisSelecttDiv}>
									<TableDetailsComponent
										title="Product Rate List"
										columns={colums}
										tableData={columdata}
										loading={false}
										pagination={false}
										onRowClick={(currentRowsSelected: any, allRowsSelected: any) => {
											setShowOption(false);
											handleOnClick(
												currentRowsSelected,
												allRowsSelected,
												valueProps.setFieldValue
											);
										}}
									/>
								</div>
							)
						) : (
							""
						)
					) : (
						<span className={optionProduct}>No Options Found</span>
					)
				}
				fullWidth
				disabled={disabled}
				size="small"
				className={menuItmeStyle}
				renderInput={(params) => (
					<TextField
						size="small"
						onChange={(e) => setInputValue(e.target.value)}
						fullWidth
						value={inputvalue}
						placeholder={placeholder}
						name={name}
						{...params}
						disabled={disabled}
					/>
				)}
			/>
			{button && button}
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const AutocompleteInput = (props: any) => {
	const { options, onChange, error, valueProps, value, name, label, placeholder, require } = props;
	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
			</InputLabel>
			<Autocomplete
				id="combo-box-demo"
				forcePopupIcon={false}
				aria-label="outlined"
				options={options}
				fullWidth
				size="small"
				className={menuItmeStyle}
				onChange={(e, newValue) => onChange({ target: { name: name, value: newValue } }, valueProps)}
				value={value}
				isOptionEqualToValue={(option, value) => option === value}
				renderInput={(params) => (
					<TextField
						size="small"
						onChange={(e) => onChange(e, valueProps)}
						fullWidth
						value={value}
						placeholder={placeholder}
						name={name}
						{...params}
					/>
				)}
			/>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const SelectInput = (props: any) => {
	const { options, onChange, error, valueProps, value, name, label, placeholder, button, require } = props;

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Select
				fullWidth
				size="small"
				id="demo-multiple-chip"
				value={value?.name}
				name={name}
				displayEmpty
				sx={{ color: value && lightGrey }}
				onChange={(e) => onChange(e, valueProps)}
				renderValue={() => (value?.name ? value.name : value ? value : placeholder)}
			>
				{options.map((item: any) => (
					<MenuItem style={{ textTransform: "capitalize" }} key={item} value={item.id ? item : item.name}>
						{item.number
							? `${item.name}  ${item.number}`
							: item.type
							? `${item.name} (${item.type})`
							: item.name}
					</MenuItem>
				))}
			</Select>
			{button && button}
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const AutoCompleteSelect = (props: any) => {
	const {
		options,
		onChange,
		error,
		valueProps,
		value,
		name,
		label,
		placeholder,
		button,
		require,
		disabled,
		optionLebel
	} = props;

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Autocomplete
				freeSolo
				getOptionDisabled={(option) => disabled}
				id="free-solo-2-demo"
				size="small"
				isOptionEqualToValue={(option, value) => option === value}
				disableClearable
				value={value}
				onChange={(e, newValue) => onChange({ target: { name: name, value: newValue } }, valueProps)}
				options={options.map((option: any) => option.name[optionLebel])}
				renderInput={(params) => (
					<>
						<TextField
							name={name}
							onChange={(e) => onChange(e, valueProps)}
							placeholder={placeholder}
							{...params}
							InputProps={{
								...params.InputProps,
								type: "search"
							}}
						/>
					</>
				)}
			/>
			{button && button}
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const AutoCompleteSeacrhSelect = (props: any) => {
	const { options, onChange, error, disabled, valueProps, value, name, label, placeholder, button, require } = props;

	return (
		<div className={`${formGroup}`}>
			<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
				{label}
				{require && <span className={requireStyle}>*</span>}
			</InputLabel>
			<Autocomplete
				forcePopupIcon={false}
				id="free-solo-with-text-demo"
				size="small"
				isOptionEqualToValue={(option, value) => option === value}
				disableClearable
				disabled={disabled}
				onChange={(e, newValue) => onChange({ target: { name: name, value: newValue } }, valueProps)}
				value={value}
				options={options}
				getOptionLabel={(option) => (option?.name ? option.name : value)}
				renderInput={(params) => <TextField value={value} placeholder={placeholder} {...params} />}
			/>
			{button && button}
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};
