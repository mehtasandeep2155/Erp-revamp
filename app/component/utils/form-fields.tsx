import { InputLabel, TextField, Autocomplete, MenuItem, Select, Checkbox, ListItemText } from "@mui/material";
import { ErrorMessage } from "formik";
import { errText, labelStyles, productLisSelecttDiv, requireStyle, optionProduct, menuItmeStyle } from "@css/styles";
import { ExpandMore } from "@mui/icons-material";
import TableDetailsComponent from "@common/tables/details-table";
import { useState } from "react";
import { darkGrey, lightGrey } from "@css/color-palette";

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
	inputStyle,
	defaultValue,
	icon,
	formGroupStyle,
	uom
}: any) => {
	return (
		<div>
			<div className={formGroupStyle}>
				{label && (
					<InputLabel className={`${labelStyles}`}>
						{label}
						{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}> </span>}
					</InputLabel>
				)}
				<input
					className={inputStyle}
					disabled={disabled}
					defaultValue={defaultValue}
					value={value}
					placeholder={placeholder}
					name={name}
					type={type ? type : "text"}
					onChange={(e) => onChange(e, valueProps, id, uid)}
				/>
				{uom ? uom : null}
				{icon ? icon : null}
			</div>
			{error && <ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>}
		</div>
	);
};

export const MultiCompanySelectInput = (props: any) => {
	const { onChange, options, label, valueProps, value, error, name, formGroupStyle, require, placeholder, style } =
		props;

	return (
		<div>
			<div className={formGroupStyle}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
					{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}> </span>}
				</InputLabel>
				<Autocomplete
					multiple
					limitTags={3}
					id="multiple-limit-tags"
					size="small"
					options={options}
					onChange={(e, newValue) => onChange({ target: { name: name, value: newValue } }, valueProps)}
					sx={style}
					disableCloseOnSelect
					defaultValue={value}
					getOptionLabel={(option: any) => (option?.name ? option.name : option.color)}
					renderOption={(props, option, { selected, index }) => (
						<MenuItem {...props} sx={{ padding: "0px" }}>
							<Checkbox checked={selected} sx={{ padding: "0px" }} />
							<ListItemText sx={{ padding: "0px" }} primary={option.name ? option.name : option} />
						</MenuItem>
					)}
					renderInput={(params) => (
						<TextField size="small" fullWidth placeholder={placeholder} name={name} {...params} />
					)}
				/>
			</div>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
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
		formGroup,
		style,
		handleOnClick
	} = props;

	const [inputvalue, setInputValue] = useState("");
	const [showOption, setShowOption] = useState(false);

	return (
		<div>
			<div className={formGroup}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
					{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}> </span>}
				</InputLabel>
				<Autocomplete
					id="combo-box-demo"
					forcePopupIcon={false}
					aria-label="outlined"
					options={columdata}
					value={value}
					sx={style}
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
			</div>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const AutocompleteInput = (props: any) => {
	const { options, style, onChange, error, valueProps, value, formGroup, name, label, placeholder } = props;
	return (
		<div>
			<div className={formGroup}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
				</InputLabel>
				<Autocomplete
					id="combo-box-demo"
					forcePopupIcon={false}
					aria-label="outlined"
					options={options}
					fullWidth
					sx={style}
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
			</div>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const SelectInput = (props: any) => {
	const { options, onChange, error, valueProps, value, name, label, formGroup, placeholder, button, require } = props;

	return (
		<div>
			<div className={formGroup}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
					{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}> </span>}
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
			</div>
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
		optionLebel,
		formGroup,
		style
	} = props;

	return (
		<div>
			<div className={formGroup}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
					{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}></span>}
				</InputLabel>
				<Autocomplete
					freeSolo
					getOptionDisabled={(option) => disabled}
					id="free-solo-2-demo"
					size="small"
					isOptionEqualToValue={(option, value) => option === value}
					disableClearable
					value={value}
					sx={style}
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
			</div>
			<ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>
		</div>
	);
};

export const AutoCompleteSeacrhSelect = (props: any) => {
	const {
		options,
		style,
		onChange,
		error,
		formGroup,
		valueProps,
		value,
		disabled,
		name,
		label,
		placeholder,
		button,
		require
	} = props;
	return (
		<div>
			<div className={formGroup}>
				<InputLabel id="demo-multiple-chip-label" className={`${labelStyles} `}>
					{label}
					{require ? <span className={requireStyle}>*</span> : <span className={requireStyle}> </span>}
				</InputLabel>
				<Autocomplete
					disablePortal
					clearIcon={false}
					getOptionLabel={(option) => (option?.name ? option.name : value)}
					id="combo-box-demo"
					aria-label="outlined"
					options={options}
					fullWidth
					disabled={disabled}
					popupIcon={<ExpandMore />}
					sx={style}
					size="small"
					className={menuItmeStyle}
					onChange={(e, newValue) => onChange({ target: { name: name, value: newValue } }, valueProps)}
					value={value}
					renderInput={(params) => (
						<TextField
							size="small"
							onChange={(e) => onChange(e, valueProps)}
							fullWidth
							value={value}
							disabled={disabled}
							placeholder={placeholder}
							name={name}
							{...params}
						/>
					)}
				/>
				{button && button}
			</div>
			{error && <ErrorMessage name={error}>{(msg) => <div className={errText}>{msg}</div>}</ErrorMessage>}
		</div>
	);
};
