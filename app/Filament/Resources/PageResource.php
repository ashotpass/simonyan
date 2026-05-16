<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->disabled()->dehydrated(false),
            Forms\Components\Tabs::make('Translations')->tabs([
                Forms\Components\Tabs\Tab::make('Հայերեն (HY)')->schema([
                    Forms\Components\TextInput::make('title_hy')->required()->maxLength(255),
                    Forms\Components\RichEditor::make('body_hy')->columnSpanFull(),
                    Forms\Components\TextInput::make('meta_title_hy')->maxLength(255),
                    Forms\Components\Textarea::make('meta_description_hy')->maxLength(500),
                ]),
                Forms\Components\Tabs\Tab::make('English (EN)')->schema([
                    Forms\Components\TextInput::make('title_en')->required()->maxLength(255),
                    Forms\Components\RichEditor::make('body_en')->columnSpanFull(),
                    Forms\Components\TextInput::make('meta_title_en')->maxLength(255),
                    Forms\Components\Textarea::make('meta_description_en')->maxLength(500),
                ]),
            ])->columnSpanFull(),
            Forms\Components\FileUpload::make('og_image')->image()->directory('og'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->badge()->sortable(),
            Tables\Columns\TextColumn::make('title_hy')->label('Title (HY)')->searchable(),
            Tables\Columns\TextColumn::make('title_en')->label('Title (EN)')->searchable(),
            Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable(),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    public static function canCreate(): bool { return false; }
    public static function canDelete($record): bool { return false; }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
