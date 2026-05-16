<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\TextInput::make('slug')->required(),
                Forms\Components\TextInput::make('icon')->maxLength(50),
                Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            ]),
            Forms\Components\Tabs::make('Translations')->tabs([
                Forms\Components\Tabs\Tab::make('Հայերեն (HY)')->schema([
                    Forms\Components\TextInput::make('title_hy')->required(),
                    Forms\Components\RichEditor::make('body_hy')->columnSpanFull(),
                    Forms\Components\TextInput::make('meta_title_hy'),
                    Forms\Components\Textarea::make('meta_description_hy'),
                ]),
                Forms\Components\Tabs\Tab::make('English (EN)')->schema([
                    Forms\Components\TextInput::make('title_en')->required(),
                    Forms\Components\RichEditor::make('body_en')->columnSpanFull(),
                    Forms\Components\TextInput::make('meta_title_en'),
                    Forms\Components\Textarea::make('meta_description_en'),
                ]),
            ])->columnSpanFull(),
            Forms\Components\FileUpload::make('og_image')->image()->directory('og'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('sort_order')->sortable(),
            Tables\Columns\TextColumn::make('slug')->badge(),
            Tables\Columns\TextColumn::make('title_hy')->label('Title (HY)')->searchable(),
            Tables\Columns\TextColumn::make('title_en')->label('Title (EN)')->searchable(),
        ])->defaultSort('sort_order')->actions([
            Tables\Actions\EditAction::make(),
        ])->headerActions([
            Tables\Actions\CreateAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
